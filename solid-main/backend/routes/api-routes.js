const router = require('express').Router()
const User = require('../models/user')

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

module.exports = router;
