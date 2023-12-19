const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')

// const authCheck = (req,res,next)=>{
//     console.log('auth check if login')
//     if(req.session.passport){
//         const token = req.session.passport.user;
//         if(token._id){
//             if(token.studentID){
//                 console.log('login sucess');
//                 const resp = {
//                     loginState: 'LoginSuccess',
//                     completeCreateState: 'FinishCompleteCreate' 
//                 }
//                 res.json(resp)
//             }else{
//                 console.log('createState fail');
//                 const resp = {
//                     loginState: 'LoginSuccess',
//                     completeCreateState: 'FinishCompleteCreate' 
//                 }
//                 res.json(resp)
//             }
//         }else{
//             console.log('login fail');
//             const resp = {
//                 loginState: 'LoginFailed',
//                 completeCreateState: 'UnFinishCompleteCreate' 
//             }
//             res.json(resp)
//         }
//     }else{
//         console.log('login fail');
//         const resp = {
//             loginState: 'LoginFailed',
//             completeCreateState: 'UnFinishCompleteCreate' 
//         }
//         res.json(resp)
//     }
//     res.send('what ?')
// };

const authCheck = (req, res, next) => {
    let resp = {
        loginState: 'LoginFailed',
        completeCreateState: 'UnFinishCompleteCreate'
    };

    if (req.session.passport && req.session.passport.user._id) {
        resp.loginState = 'LoginSuccess';
        resp.completeCreateState = req.session.passport.user.studentID ? 'FinishCompleteCreate' : 'UnFinishCompleteCreate';
    }

    console.log(resp.loginState === 'LoginSuccess' ? 'login success' : 'login fail');
    res.json(resp);
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
