const User = require('./user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy

module.exports = function(passport){
    passport.use(
        new localStrategy(async (username,password,done)=>{
            try{
                const user = await User.findOne({username: username});
                if(!user){
                    return done(null,false);
                }
                if(user){
                    // console.log("a");
                    // console.log(password);
                    // console.log(user.username);
                    bcrypt.compare(password, user.password, function (err, result){
                        if(err) throw err;
                        if(result === true){
                            return done(null, user);
                        } else {
                            console.log('sdsssssssssssssssssssssss');
                            return done(null, false);
                        }
                    })
                }
            }catch (err){
                throw err;
            }
        })
    )
    passport.serializeUser((user,cb)=>{
        cb(null,user.id);
    })
    passport.deserializeUser(async (id,cb)=>{
        const user = await User.findOne({_id: id});
        cb(null,user);
    })
}



