const router = require('express').Router()
const User = require('../models/user')

function Auth(req, res, next) {
    return next();
    // 記得開
    if(req.session.passport && req.session.passport.user){
      return next();
    } else {
      res.send('please login first');
    }
  }

router.post('/updateinfo',(req,res)=>{
    console.log('try update info');
    //console.log(req.session.passport.user.googleid)
    User.findOneAndUpdate(
        { googleid : req.session.passport.user.googleid }, // 查詢條件
        { username: req.body.username , // 更新的資料
         realname: req.body.realname , 
         studentID: req.body.studentID }, 
        { new: true } 
    ).then(doc => {
        req.session.passport.user.username = req.body.username;
        req.session.passport.user.realname = req.body.realname;
        req.session.passport.user.studentID = req.body.studentID;
        res.send('save success')
    })
    .catch(err => {
        console.error(err);
    });
})

router.get('/getUserInfo',Auth,(req,res)=>{
    //console.log('??????????????????????????????????');
    //console.log(req.session.passport.user);
    res.json({
        _id : req.session.passport.user._id,
        username: req.session.passport.user.username,
        thumbnail: req.session.passport.user.thumbnail,
        googleid: req.session.passport.user.googleid,
        realname: req.session.passport.user.realname,
        studentID: req.session.passport.user.studentID
    })
})

module.exports = router;
