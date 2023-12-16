const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username: String,
    password: String,
    realname: String,
    studentID: String,
    email: String
});
module.exports = mongoose.model("User",user);
