const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi')

const Schema = {
    name : Joi.string().min(6).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
}

// router.post('/updateinfo',(req,res)=>{
//     console.log(req.session.passport.user.googleid)
//     User.findOneAndUpdate(
//         { googleid : req.session.passport.user.googleid }, // 查詢條件
//         { username: req.body.username , // 更新的資料
//          realname: req.body.realname , 
//          studentID: req.body.studentID }, 
//         { new: true } 
//     ).then(doc => {
//         req.session.passport.user.username = req.body.username;
//         req.session.passport.user.realname = req.body.realname;
//         req.session.passport.user.studentID = req.body.studentID;
//         res.send('save success')
//     })
//     .catch(err => {
//         console.error(err);
//     });
// })

router.get('/auth-state',(req,res)=>{
    //console.log('auth check if login----------------------')
    // console.log(req.session);
    if(req.session.passport){
        const token = req.session.passport.user;
        if(token._id){
            if(token.studentID){
                console.log('LoginSuccess');
                const resp = {
                    loginState: 'LoginSuccess',
                    completeCreateState: 'FinishCompleteCreate' 
                }
                res.json(resp)
            }else{
                console.log('UnFinishCompleteCreate');
                const resp = {
                    loginState: 'LoginSuccess',
                    completeCreateState: 'UnFinishCompleteCreate' 
                }
                res.json(resp)
            }
        }else{
            console.log('LoginFailed');
            const resp = {
                loginState: 'LoginFailed',
                completeCreateState: 'UnFinishCompleteCreate' 
            }
            res.json(resp)
        }
    }else{
        console.log('LoginFailed');
        const resp = {
            loginState: 'LoginFailed',
            completeCreateState: 'UnFinishCompleteCreate' 
        }
        res.json(resp)
    }
})


// //auth login
// router.get('/login',(req,res)=>{
//     //login
//     res.send('postman GET /login')
// })

// router.post('/login', (req, res,next) => {
//     // not used
//     console.log('login local ?? ')
//     passport.authenticate('local', (err, user, info) => {
//         if (err) throw err;
//         if (!user){
//             return res.send("username_not_exist");
//         } 
//         else {
//             req.logIn(user, async err => {
//                 if (err) throw err;
//                 try {
//                     const result = await User.findOne({username: req.body.username});
//                     console.log('username = ',result.username);
//                     return res.send('successfully_authenticated');
//                 } catch (error) {
//                     console.error(error);
//                     return res.send('password_not_match')
//                 }
//             })
//         }
//     })(req, res, next);
// });

// //auth register
// router.post("/register",async (req,res)=>{ 
//     // not used
//     try {
//         const doc = await User.findOne({ username: req.body.username });
//         if (doc) {
//             res.send("User Exists");
//         }
//         if(!doc){
//             const hashedPassword = await bcrypt.hash(req.body.password,10); 
//             const newUser = new User({
//                 username: req.body.username,
//                 password: hashedPassword,
//                 realname: req.body.realname,
//                 studentID: req.body.studentID,
//                 email: req.body.email
//             });
//             await newUser.save();
//             res.send("create");
//         }
//     }catch (err){
//         throw err;
//     }
// })


//auth api logout
router.get('/auth-state',(req,res)=>{
    //res.send('haha')
    //res.send(req.user)
    console.log('auth check if login----------------------')
    console.log(req.session);
    if(req.session.passport){
        const token = req.session.passport.user;
        if(token._id){
            if(token.studentID){
                console.log('login sucess');
                const resp = {
                    loginState: 'LoginSuccess',
                    completeCreateState: 'FinishCompleteCreate' 
                }
                res.json(resp)
            }else{
                console.log('createState fail');
                const resp = {
                    loginState: 'LoginSuccess',
                    completeCreateState: 'UnFinishCompleteCreate' 
                }
                res.json(resp)
            }
        }else{
            console.log('login fail');
            const resp = {
                loginState: 'LoginFailed',
                completeCreateState: 'UnFinishCompleteCreate' 
            }
            res.json(resp)
        }
    }else{
        console.log('login fail');
        const resp = {
            loginState: 'LoginFailed',
            completeCreateState: 'UnFinishCompleteCreate' 
        }
        res.json(resp)
    }
})

//auth logout
router.get('/logout',(req,res)=>{
    console.log('try logout')
    req.session.destroy((err) => {
        if(err) {
            res.json({
                logoutState : 'LogoutFailed'
            })
            return console.log(err);
        }
        res.json({
            logoutState : 'LogoutSuccess'
        })
    });
    
})


//auth  google
router.get('/google',passport.authenticate('google',{
    scope : ['profile','email']
}))

//auth google back
router.get('/google/redirect', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect(`${process.env.frontUrl}/home`)
    }
);

module.exports = router;
