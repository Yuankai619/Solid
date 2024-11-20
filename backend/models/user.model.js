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
        email: {
            type: String,
            required: true,
        },
        studenId: {
            type: String,
            required: false,
        },
        password: {
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
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
