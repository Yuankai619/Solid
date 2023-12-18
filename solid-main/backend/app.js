const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user')
const keys = require('./config/keys')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const homeRoutes = require('./routes/home-routes')
const passportSetup = require('./config/passportConfig');
require('dotenv').config();
//const cookieParser = require('cookie-parser');

// ---------------------------  end of import -------------------------------

const app = express();
mongoose.connect(process.env.mongoDB)
    .then(() => console.log('Connected to Mongo Successfully'))
    .catch(error => console.error(error));

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors({
    origin: process.env.frontUrl, // where react app connect    
    credentials: true 
}))

// app.use(session({
//     secret : "secretcode",
//     resave : true,
//     saveUninitialized : true
// }))

// app.use(cookieParser("secretcode"));

//cookie
app.use(expressSession({
    secret : keys.session.cookieKey,
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge: 24 * 60*60*1000 }
}))

// init passport
app.use(passport.initialize());
app.use(passport.session());




//routes 
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)
app.use('/home',homeRoutes)



// ---------------------------  end of middleware -------------------------------



app.get("/user",(req,res)=>{
    console.log(req.body.username);
})

app.get('/',(req,res)=>{
    console.log("res ",req.user)
    res.send('welcome to  HOME page');
})


// ---------------------------  end of routes -------------------------------

//startserver
app.listen(4000,()=>{
    console.log(`Server Has Started on port ${4000} `);
});
