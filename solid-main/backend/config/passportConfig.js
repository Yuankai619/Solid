const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const googleStrategy = require('passport-google-oauth20')
const jwt = require('jsonwebtoken');

require('dotenv').config();
// 本地策略
passport.use(new localStrategy(
  async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
    if (!user) {
        return done(null, false);
    }
    if(user){
        bcrypt.compare(password, user.password, function (err, result){
            if(err) throw err;
            if(result === true){
                console.log('passport success')
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }
    }catch (err){
        return done(err);
    }
  }
));

// Google 策略
passport.use(
    new googleStrategy({
        //options for google strat
        clientID: process.env.GoogleclientID,
        clientSecret: process.env.GoogleclientSecret,
        callbackURL:`${process.env.backUrl}/auth/google/redirect`,
        //scope: [ 'profile' ]
    },function(req, accessToken, refreshToken, profile, done){
        //check if already exists
        User.findOne({googleid: profile.id}).then((currentUser)=>{
            if(currentUser){
                //already have
                //console.log('find user is ',currentUser);
                console.log('user aleady exist with name : ',currentUser.username);
                done(null,currentUser);
            }else{
                //create user
                //console.log(profile);
                new User({
                    username : profile.displayName,
                    googleid : profile.id,
                    thumbnail : profile._json.picture,
                    email:  profile._json.email
                }).save().then((newUser)=>{
                    console.log('new user created: ')//,newUser)
                    return done(null, newUser);
                    // done(null,newUser);
                })
                //res.redirect(`/profile`,{user: Uesr})
            }
        })

    })
)

// 序列化與反序列化
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


