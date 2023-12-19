const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')

const authCheck = (req,res,next)=>{
    console.log('home  if log in')
    if(!req || req.user.studentID){
        // not login in 
        res.send('??');
        return;
    }else{
        next();
    }
};

router.get('/check',authCheck,(req,res)=>{
    res.send('login')
})

router.get('/main',authCheck,(req,res)=>{
    console.log('haha')
    res.redirect(`${process.env.frontUrl}/home`)
})

module.exports = router;
