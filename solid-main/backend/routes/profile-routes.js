const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')

const authCheck = (req,res,next)=>{
    console.log('profile if log in')
    console.log(req.user);
    if(!req){
        // not login in 
        console.log('p not login');
        res.redirect(`${process.env.frontUrl}/login`)
        
    }
    else if(req.user){
        if(req.user.studentID){
            console.log('profile if log in')
            res.redirect(`${process.env.frontUrl}/home`)
            
        }else{
            //console.log(`${process.env.frontUrl}/profile`,`------------`);
            next();
        }
    }
};

router.get('/',authCheck,(req,res)=>{
    //res.send('haha')
    //res.send(req.user)
})

router.get('/me',authCheck,(req,res)=>{
    res.redirect(`${process.env.frontUrl}/updateinfo`)
    //res.send(req.user)
})


router.post('/me',authCheck,(req,res)=>{
    //console.log('------------------------------------');
    //console.log(req.body);
    //console.log(req.user.googleid);
    User.findOneAndUpdate(
        { googleid: req.user.googleid }, // 查詢條件
        { username: req.body.username , // 更新的資料
         realname: req.body.realname , 
         studentID: req.body.studentID }, 
        { new: true } // 如果設定為 true，返回的將會是修改後的文件。預設值為 false，返回原始文件。
    )
    .then(doc => {
        //console.log('Updated User:');
        res.send('good')
        res.redirect(`${process.env.backUrl}/home/main`)
        //res.send('')
    })
    .catch(err => {
        console.error(err);
    });
})



module.exports = router;
