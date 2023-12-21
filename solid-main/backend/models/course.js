const mongoose = require('mongoose')
const course = new mongoose.Schema({
    info : 
    {
        classID  :  String,
        authorID :  String,
        state    :  String,
        title    :  String,
        description : String,
        createDate :  Date,
    },
    member : 
    [
        { userid : String }
    ],
    message : 
    [
        {
            userID: String,
            username : String,
            message: String,
            timestamp: Date
        }
    ]
});
module.exports = mongoose.model("Course",course);
