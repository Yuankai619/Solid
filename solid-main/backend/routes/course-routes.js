const router = require('express').Router()
const User = require('../models/user')
const Course = require('../models/course');
const uuid = require('uuid');

function Auth(req, res, next) {
    //  return next();
    // 記得開
    if(req.session.passport && req.session.passport.user){
      return next();
    } else {
      res.send('please login first');
    }
}

router.post('/getOnesInfo',Auth,async (req,res)=>{
    //console.log('??????????????????????????????????',req.body.id);
    //console.log(req.session.passport.user);
    try{
        const _user = await  User.findById(req.body.id);
        if (!_user) {
            console.log('User not found');
        }
        console.log('ha',_user.username)
        res.json({
            authorName : _user.username
        })
    }catch(err){
        console.log(err);
        res.json({
            authorName : "user not found"
        })
    }
})

//從使用者新增joinedClass
router.post('/userAddJoinedClass',Auth,async(req,res)=>{
    // console.log('??');
    const _userid = req.session.passport.user._id;
    //  const _userid = req.body.userID;
    const _classid = req.body.classID;
    const course = await Course.findOne({ 'info.classID': _classid });
    if(!course){
        return res.send('CourseNotFound');
    }
    User.findByIdAndUpdate(_userid, { $push: { joinedClass: { classID: _classid } } }).then(()=>{
        console.log('從使用者新增joinedClass成功')
        return res.send(course.info);
    }).catch((err)=>{
        console.log(err);
        console.log('從使用者新增joinedClass失敗')
        return res.send('FailedJoinCourse');
    });
})

//從使用者刪除joinedClass
router.post('/userPullJoinedClass',Auth,async(req,res)=>{
    const _userid = req.session.passport.user._id;
    // const _userid = req.body.userID;
    const _classid = req.body.classID;
    User.findByIdAndUpdate(_userid, { $pull: { joinedClass: { classID: _classid } } }).then(()=>{
        console.log('從使用者刪除joinedClass成功')
        return res.send('從使用者刪除joinedClass成功');
    }).catch((err)=>{
        console.log(err);
        console.log('從使用者刪除joinedClass失敗')
        return res.send('從使用者刪除joinedClass失敗')
    });
})

//回傳該classid對應的class全內容
router.post('/loadClassAll', Auth, async (req, res) => {
    const _classID = req.body.classID;
    console.log('載入課程',_classID,'中的資訊')
    //console.log(req.body)
    //console.log(_classID)
    // 找到對應的課程
    const course = await Course.findOne({ 'info.classID': _classID });
    if (!course) {
        console.log('載入課程',_classID,'中的資訊失敗')
        return res.status(404).send('找不到對應的課程');
    }

    // 回傳課程的所有資料
    console.log('載入課程',_classID,'中的資訊成功')
    res.status(200).json(course);
});

router.post('/sendMessage',Auth, async (req, res) => {
    const _classID = req.body.classID;
    const _isAnonymous = req.body.isAnonymous;
    const _message = req.body.message;
    const _uuid = uuid.v4();
    const _score = req.body.score;
    console.log('發送留言',_message,'到課程',_classID,"匿名",_isAnonymous);
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
        console.log('發送留言',_message,'到課程',_classID,"匿名",_isAnonymous,'失敗');
        console.log('找不到對應的課程');
        return res.status(404).send('找不到對應的課程');
    }
    course.message.push(newMessage);
    await course.save();
    console.log('發送留言',_message,'到課程',_classID,"匿名",_isAnonymous,'成功');
    res.status(200).json({  message: '訊息已成功加入',messageId: _uuid });
});


router.post('/deleteMessage',Auth, async (req, res) => {
    const _classID = req.body.classID;
    const _messageID = req.body.messageID;
    //console.log('發送留言',_message,'到課程',_classID,"匿名",_isAnonymous);
    // 建立新的訊息物件
    console.log(_classID,_messageID,'?')
    const course = await Course.findOne({ 'info.classID': _classID });
    if (!course) {
        console.log('找不到對應的課程');
        return res.status(404).send('找不到對應的課程');
    }
    Course.findOneAndUpdate(
        { 'info.classID': req.body.classID },
        { $pull: { message : {messageid : _messageID }} }
        // { new: true, useFindAndModify: false }
    )
    .then(course => {
        console.log('刪除留言成功')
        res.send('Comment delete successfully!');
    })
    .catch(err => {
        console.error(err);
        console.log('刪除留言失敗')
        res.status(500).send(err);
    });
});

router.post('/setAnonymous', Auth, async (req, res) => {
    console.log('hello')
    const _classID = req.body.classID;
    const _messageID = req.body.messageID;
    let _isAnonymous = req.body.isAnonymous;
    if(_isAnonymous == 'true') _isAnonymous = 'false';
    else _isAnonymous = 'true';
    console.log('將留言設定成',_isAnonymous);
    Course.findOneAndUpdate(
        { 'info.classID': _classID, 'message.messageid': _messageID },
        { $set: { 'message.$.isAnonymous': _isAnonymous } }
    )
    .then(course => {
        console.log('更改留言狀態成功')
        res.send('Comment status updated successfully!');
    })
    .catch(err => {
        console.error(err);
        console.log('更改留言狀態失敗')
        res.status(500).send(err);
    });
});


//留言區加分扣分
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
        return res.status(404).send('找不到對應的留言');
    }

    message.score = _score;
    if(!_score) message.score = 'null';
    console.log('sss',message.score);
    await course.save();
    res.status(200).send('留言分數已成功更新');
});

// 改變課程是否開放
router.post('/changeState',Auth, async(req,res) =>{
    const _classID = req.body.classID;
    const _state = req.body.state;
    console.log('嘗試更改課程',_classID,'狀態到',_state);
    try {
        await Course.findOneAndUpdate(
            { 'info.classID': _classID },
            { 'info.state': _state }
        );
        console.log('更改課程狀態成功');
        return res.send('更改課程狀態成功')
    } catch (err) {
        console.log(err,'更改課程狀態失敗');
        return res.send('更改課程狀態失敗')
    }
})

// 用不到了
//載入所有留言
// router.post('/loadAllMessage',Auth,async(req,res)=>{
//     const _classID = req.body.classID;

//     // 找到對應的課程
//     const course = await Course.findOne({ 'info.classID': _classID });
//     if (!course) {
//         return res.status(404).send('找不到對應的課程');
//     }

//     // 回傳訊息陣列
//     //console.log(course.message);
//     console.log('回傳訊息陣列成功');
//     res.status(200).json(course.message);
// })

//刪除createdClass
router.post('/deleteClass',Auth, async(req,res) =>{
    // console.log(req.body);
    const _classID = req.body.classID;
    //console.log(_classID);
    console.log('嘗試刪除課程' , _classID , '成功');
    try {
        const course = await Course.findOne({ 'info.classID': _classID });
        if (!course) {
            return res.status(404).send('找不到對應的課程');
        }
        await Course.findOneAndDelete({ 'info.classID': _classID });
        console.log('刪除課程' , _classID , '成功');
        return res.send('suc');
    } catch (err) {
        console.log(err,'嘗試刪除課程' , _classID , '失敗');
        return res.send('fail');
    }
})



// router.post('/userDeleteMessage',Auth,(req,res)=>{
//     const _id = req.session.passport.user._id;
//     const _classID = req.body.classID;
//     const _messageID = req.body.state;
    
// })


router.get('/getCreatedClass', Auth, async (req, res) => {
    const _id = req.session.passport.user._id;
    try {
        const user = await User.findById(_id);
        let createdClass = user.createdClass;

        const coursesInfo = [];
        for (let i = 0; i < createdClass.length; i++) {
            const classID = createdClass[i].classID;
            const course = await Course.findOne({ 'info.classID': classID });
            if (!course) {
                // 如果課程不存在，從 createdClass 中刪除該課程ID
                createdClass = createdClass.filter(item => item.classID !== classID);
            } else {
                coursesInfo.push(course.info);
            }
        }

        // 更新使用者的 createdClass
        user.createdClass = createdClass;
        await user.save();

        res.send(coursesInfo);
    } catch (err) {
        console.log('在用戶創建的課程名單中查詢課程錯誤');
        console.log(err);
        res.send('查詢課程錯誤');
    }
});


// 返回USER加入的全部courseINFO
router.get('/getJoinedClass', Auth, async (req, res) => {
    const _id = req.session.passport.user._id;
    // const _id = req.body.userID;
    try {
        const user = await User.findById(_id);
        let joinedClass = user.joinedClass;

        const coursesInfo = [];
        for (let i = 0; i < joinedClass.length; i++) {
            const classID = joinedClass[i].classID;
            const course = await Course.findOne({ 'info.classID': classID });
            if (!course) {
                // 如果課程不存在，從 joinedClass 中刪除該課程ID
                joinedClass = joinedClass.filter(item => item.classID !== classID);
            } else {
                coursesInfo.push(course.info);
            }
        }

        // 更新使用者的 joinedClass
        user.joinedClass = joinedClass;
        await user.save();

        res.send(coursesInfo);
    } catch (err) {
        console.log('在用戶加入的課程名單中查詢課程錯誤');
        console.log(err);
        res.send('查詢課程錯誤');
    }
});




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
        console.log(_classID)
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
