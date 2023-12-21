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

router.post('/create',Auth,(req,res)=>{
    const _userID = req.body.authorID;
    const _user = req.body.author;
    const _state = req.body.state;
    const _title = req.body.title;
    const newCourse = new Course({
        info : 
        {
            classID  :  "123456",
            authorID :  _userID,
            state    :  _state,
            title    :  _title,
            description : " default description",
            createDate :  new Date()
        },
        member : 
        [
            { userid : _userID }
        ],
        message : 
        [
            {
                user: _user,
                message: " test ",
                timestamp: new Date()
            }
        ]
    });
    newCourse.save().then((err) => {
        res.send('Course created successfully!');
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
})

router.post('/addComment', Auth,(req, res) => {
    const comment = {
        user: req.body.user,
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
