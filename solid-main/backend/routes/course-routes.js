const router = require('express').Router()
const User = require('../models/user')
const Course = require('../models/course');
const { route } = require('./auth-routes');

function Auth(req, res, next) {
    // return next();
    // 記得開
    if(req.session.passport && req.session.passport.user){
      return next();
    } else {
      res.send('please login first');
    }
}

router.post('/changeState',Auth, async(req,res) =>{
    const _classID = req.body.classID;
    const _state = req.body.state;
    console.log(_classID,_state);
    try {
        await Course.findOneAndUpdate(
            { 'info.classID': _classID },
            { 'info.state': _state }
        );
        console.log("Course with classID " + _classID + " has been updated.");
    } catch (err) {
        console.log("Something wrong when updating data!", err);
    }
})


router.post('/deleteClass',Auth, async(req,res) =>{
    // console.log(req.body);
    const _classID = req.body.classID;
    //console.log(_classID);
    try {
        await Course.findOneAndDelete({ 'info.classID': _classID });
        console.log("Course with classID " + _classID + " has been deleted.");
    } catch (err) {
        console.log("Something wrong when deleting data!", err);
    }
    res.send('yes')
})

router.get('/getClass',Auth, async (req,res)=>{
    console.log('hi');
    //console.log( req.session.passport);
    //console.log(_id);
    const _id = req.session.passport.user._id;
    try{
        const user = await User.findById(_id);
        const createdClass = user.createdClass;
        //console.log(createdClass)
        const coursesInfo = await Promise.all(createdClass.map(async ({ classID }) => {
            try{
                const course = await Course.findOne({ 'info.classID': classID });
                console.log(course.info)
                return course.info;
            }catch(err){
                console.log(err);
            }
        }));
        //console.log(coursesInfo)
        res.send(coursesInfo);
    }catch(err){
        console.log(err);
    }
})

router.post('/deleteClassFromUser',Auth,(req,res)=>{
    const _id = req.session.passport.user._id;
    const _classID = req.body.classID;
    // console.log(_id);
    // console.log(_classID);
    User.findByIdAndUpdate(_id, { $pull: { createdClass: { classID: _classID } } }).then(()=>{
        console.log('success user delete')
        res.send('suc');
    }).catch((err)=>{
        console.log(err)
    });
})


router.post('/addClassToUser',Auth,(req,res)=>{
    const _id = req.session.passport.user._id;
    const _classID = req.body.classID;
    // console.log(_id);
    // console.log(_classID);
    User.findByIdAndUpdate(_id, { $push: { createdClass: { classID: _classID } } }).then(()=>{
        console.log('success user update')
        res.send('suc');
    }).catch((err)=>{
        console.log(err)
    });
})


async function generateUniqueClassID() {
    let classID;
    let course;
    do {
        classID = Math.floor(10000 + Math.random() * 90000).toString(); // generates a 5-digit number
        course = await Course.findOne({ 'info.classID': classID });
    } while (course);
    return classID;
}


router.post('/create',Auth, (req, res) => {
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
            console.log('create class',_classID);
            res.json({
                id: _classID,
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
