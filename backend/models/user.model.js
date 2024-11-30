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
        studentId: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
        },
        avatarUrl: {
            type: String,
            required: false,
        },
        googleId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
