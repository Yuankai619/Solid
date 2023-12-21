const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
const apiRoutes = require('./routes/api-routes')
const passportSetup = require('./config/passportConfig');
require('dotenv').config();

// connect Database

const app = express();
mongoose.connect(process.env.mongoDB)
    .then(() => { console.log('Connected to Mongo Successfully') })
    .catch((err) => { console.log(err) });

// ---------------------------   middleware -------------------------------

// cors
const corsOptions = {
    origin: [
        'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-TOKEN', 'Cookie', 'X-Requested-With', 'Accept'],
}
app.use(cors(corsOptions));

//cookie session
app.use(expressSession({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


// init passport
app.use(passport.initialize());
app.use(passport.session());


//routes 
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/home', homeRoutes)
app.use('/api', apiRoutes)


// ---------------------------  end of middleware -------------------------------


app.post('/test', (req, res) => {
    console.log(req.sessionID);
    req.session.a = "hi"
    res.json({ a: 1 })
})

app.get("/user", (req, res) => {
    console.log(req.body.username);
})

app.get('/', (req, res) => {
    console.log("res ", req.user)
    res.send('welcome to  HOME page');
})


// ---------------------------  end of routes ------------------------------------

//startserver
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server Has Started on port ${port} `);
});
