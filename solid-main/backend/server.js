const mongoose = require('mongoose');
const express = require('express');
const cors  = require('cors');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const User = require('./user')
// ---------------------------  end of import -------------------------------
mongoose.connect("mongodb+srv://deerufin:ismemario@cluster0.qoooxr8.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Connected to Mongo Successfully'))
    .catch(error => console.error(error));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({
    origin: 'http://localhost:3000', // where react app connect
    credentials: true 
}))

app.use(session({
    secret : "secretcode",
    resave : true,
    saveUninitialized : true
}))

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);




// ---------------------------  end of middleware -------------------------------

//routes 

app.post('/login', (req, res,next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user){
            return res.send("username_not_exist");
        } 
        else {
            req.logIn(user, async err => {
                if (err) throw err;
                try {
                    const result = await User.findOne({username: req.body.username});
                    console.log('username = ',result.username);
                    return res.send('successfully_authenticated');
                } catch (error) {
                    console.error(error);
                    return res.send('password_not_match')
                }
            })
        }
    })(req, res, next);
});

app.post("/register",async (req,res)=>{
    console.log(req.body);
    try {
        const doc = await User.findOne({ username: req.body.username });
        if (doc) {
            res.send("User Exists");
        }
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password,10); 
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                realname: req.body.realname,
                studentID: req.body.studentID,
                email: req.body.email
            });
            await newUser.save();
            res.send("create");
        }
    }catch (err){
        throw err;
    }
})

app.get("/user",(req,res)=>{
    console.log(req.body.username);
})

app.get('/',(req,res)=>{
    res.send('Sanic');
})


// ---------------------------  end of routes -------------------------------

//startserver
app.listen(4000,()=>{
    console.log(`Server Has Started on port ${4000} `);
});
