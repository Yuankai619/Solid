const router = require('express').Router()
const User = require('../models/user')
const Course = require('../models/course')

function Auth(req, res, next) {
    return next();
    // 記得開
    if(req.session.passport && req.session.passport.user){
      return next();
    } else {
      res.send('please login first');
    }
  }

router.post('/joinClass', (req, res) => {
    const { _id, classID } = req.body;
    User.findByIdAndUpdate(_id, { $push: { joinedClass: { classID } } }, { new: true })
        .then(() => res.status(200).send('Class joined successfully'))
        .catch(error => res.status(500).send('Server error'));
});

async function generateUniqueClassID() {
    let classID;
    let course;
    do {
        // Generate a new classID
        classID = Math.floor(10000 + Math.random() * 90000).toString(); // generates a 5-digit number
        // Check if the classID already exists in the database
        course = await Course.findOne({ 'info.classID': classID });
    } while (course);
    return classID;
}


router.post('/create', (req, res) => {
    const _userID = req.body.userID;
    const _description = req.body.description;
    const _title = req.body.roomTitle;
    const _state = req.body.state;
    const _username = req.body.username;
    let _classID;
    generateUniqueClassID().then(classID => {
        
        _classID = classID;
        //console.log(_classID)
        const newCourse = new Course({
            info : 
            {
                classID  :  _classID,
                authorID :  _userID,
                state    :  _state,
                title    :  _title,
                description : _description,
                createDate :  new Date()
            },
            member : 
            [
                { userid : _userID }
            ],
            message : 
            [
                {
                    userID: _userID,
                    username : _username,
                    message: "default text",
                    timestamp: new Date()
                }
            ]
        });
        newCourse.save().then((err) => {
            res.json({
                userID: _userID,
                title: _title,
                classID: _classID,
                description: _description,
                state: _state,  
            })
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
    });
});


router.post('/addComment', Auth,(req, res) => {
    const comment = {
        userID: "not comp",
        username : req.body.user,
        message: req.body.message,
        timestamp: new Date()
    };
    Course.findOneAndUpdate(
        { 'info.classID': req.body.classID },
        { $push: { message: comment } },
        { new: true, useFindAndModify: false }
    )
    .then(course => {
 
        res.send('Comment added successfully!');
    })
    .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

module.exports = router;
