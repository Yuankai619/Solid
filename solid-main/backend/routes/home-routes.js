const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
    console.log('home  if log in => ')
    const token = req.header('auth-token');
    console.log(token);
    if (!req.user) {
        // not login in 
        console.log('not login')
        res.send('not_login');
    } else if (req.User) {
        if (!req.user.studentID) {
            res.send('not_complete_create');
        } else {
            next();
        }
    }
};

router.get('/main', authCheck, (req, res) => {
    console.log('haha')
    res.redirect(`${process.env.frontUrl}/home`)
})


router.get('/auth-success', authCheck, (req, res) => {
    console.log('login')
})

module.exports = router;
