const router = require('express').Router()
const User = require('../models/user')
const Course = require('../models/course');
const uuid = require('uuid');

function Auth(req, res, next) {
      //return next();
    // 記得開
    if(req.session.passport && req.session.passport.user){
      return next();
    } else {
      res.send('please login first');
    }
}

//wtf

router.post('/loadClassAll', Auth, async (req, res) => {
    const _classID = req.body.classID;
    console.log(req.body)
    console.log(_classID)
    // 找到對應的課程
    const course = await Course.findOne({ 'info.classID': _classID });
    if (!course) {
        return res.status(404).send('找不到對應的課程');
    }

    // 回傳課程的所有資料
    res.status(200).json(course);
});

router.post('/sendMessage',Auth, async (req, res) => {
    console.log('/sendMessage');
    const _classID = req.body.classID;
    const _isAnonymous = req.body.isAnonymous;
    const _message = req.body.message;
    const _uuid = uuid.v4();
    const _score = req.body.score;
    // 建立新的訊息物件
    const newMessage = {
        messageid : _uuid,
        userID: req.session.passport.user._id,
        username: req.session.passport.user.username,
        userimg : req.session.passport.user.thumbnail,
        message: _message,
        isAnonymous: _isAnonymous,
        score: _score,
        timestamp: new Date()  
    };
    // 找到對應的課程並更新
    const course = await Course.findOne({ 'info.classID': _classID });
    if (!course) {
        return res.status(404).send('找不到對應的課程');
    }
    course.message.push(newMessage);
    await course.save();
    res.status(200).json({  message: '訊息已成功加入',messageId: _uuid });
});

//update commend score
router.post('/scoreUpdate', async (req, res) => {
    const _classID = req.body.classID;
    const _messageID = req.body.messageID;
    const _score = req.body.score;

    // 找到對應的課程
    const course = await Course.findOne({ 'info.classID': _classID });
    if (!course) {
        return res.status(404).send('找不到對應的課程');
    }

    // 在訊息陣列中找到對應的訊息並更新分數
    const message = course.message.find(msg => msg.messageid === _messageID);
    if (!message) {
        return res.status(404).send('找不到對應的訊息');
    }

    message.score = _score;
    await course.save();
    res.status(200).send('分數已成功更新');
});

// change class state
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

router.post('/loadAllMessage',Auth,async(req,res)=>{
    const _classID = req.body.classID;

    // 找到對應的課程
    const course = await Course.findOne({ 'info.classID': _classID });
    if (!course) {
        return res.status(404).send('找不到對應的課程');
    }

    // 回傳訊息陣列
    console.log(course.message);
    res.status(200).json(course.message);
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
    //console.log('hi');
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
                //console.log(course.info)
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
