const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user')
const Course = require('./models/user')
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const apiRoutes = require('./routes/api-routes')
const courseRoutes = require('./routes/course-routes')
const passportSetup = require('./config/passportConfig');
const http = require('http')
const {Server} = require('socket.io')
require('dotenv').config();

// connect Database

const app = express();
mongoose.connect(process.env.mongoDB)
    .then(() => { console.log('Connected to Mongo Successfully') })
    .catch((err) => { console.log(err) });

// ---------------------------   middleware -------------------------------

// ws

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods : ['GET','POST'],
    }
})

io.on('connection',(socket)=>{
    console.log(`User Connected: ${socket.id}`)
    socket.on('join_room',(data)=>{
        console.log(socket.id,'joined room',data);
        socket.join(data);
        //socket.emit('t','fuck');
    })
    socket.on('send_message',(data)=>{
        console.log('sent refresh',data)
        socket.to(data).emit('refresh',data);
    })
})

server.listen(5000,()=>{
    console.log('websocket is on port ',5000);
})

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
    secret: process.env.cookieKey,
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
app.use('/home', homeRoutes)
app.use('/api', apiRoutes)
app.use('/course', courseRoutes)


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
