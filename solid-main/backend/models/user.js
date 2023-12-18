const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username: {
        type : String,
        min : 6,
        max : 50
    } ,
    password: String,
    realname: String,
    studentID: String,
    thumbnail : String,
    email: String,
    googleid: String
});
module.exports = mongoose.model("User",user);
