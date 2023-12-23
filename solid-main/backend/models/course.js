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
            messageid : String,
            userID: String,
            username : String,
            userimg : String,
            message: String,
            isAnonymous : String,
            score: String,
            timestamp: Date
        }
    ]
});
module.exports = mongoose.model("Course",course);
