import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        realName: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: false,
        },
        googleId: {
            type: String,
            required: false,
        },
        studenId: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
