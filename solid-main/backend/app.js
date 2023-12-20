const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// const session = require('session');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user')
const keys = require('./config/keys')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const homeRoutes = require('./routes/home-routes')
const passportSetup = require('./config/passportConfig');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// connect Database

const app = express();
mongoose.connect(process.env.mongoDB)
    .then(() => {console.log('Connected to Mongo Successfully')})
    .catch((err) => { console.log(err) });

// ---------------------------   middleware -------------------------------

// cors
// app.use
// app.use(passport.session());
app.use(session(/* ... */));
app.use(passport.authenticate('session'));
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }
// }));
app.use(cookieParser());
const corsOptions = {
    origin: [
        'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-TOKEN' , 'Cookie' , 'X-Requested-With' , 'Accept'],
}
app.use(cors(corsOptions));

//cookie session
app.use(session({
    secret : keys.session.cookieKey,
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge: 24 * 60*60*1000 },
    passport : { maxAge: 24 * 60 * 60 * 1000 }
}))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : true}));


// init passport
app.use(passport.initialize());
app.use(passport.session());


//routes 
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)
app.use('/home',homeRoutes)


// ---------------------------  end of middleware -------------------------------


app.post('/test', (req, res) => {
    console.log(req.sessionID);
    req.session.a = "hi"
    res.json({a: 1})
})

app.get("/user",(req,res)=>{
    console.log(req.body.username);
})

app.get('/',(req,res)=>{
    console.log("res ",req.user)
    res.send('welcome to  HOME page');
})


// ---------------------------  end of routes ------------------------------------

//startserver
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server Has Started on port ${port} `);
});
