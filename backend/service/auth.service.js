import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const signup = async ({ payload }) => {
    console.log("payload", payload);
    const { userName, realName, email, studentId = "", password, avatarUrl, googleId } = payload;
    console.log("userName", userName);
    console.log("realName", realName);
    console.log("email", email);
    console.log("studentId", studentId);
    console.log("password", password);
    console.log("avatarUrl", avatarUrl);
    console.log("googleId", googleId);
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.status = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            realName,
            email,
            studentId,
            password: hashedPassword,
            avatarUrl,
            googleId,
        });

        await newUser.save();
        return { message: "User created successful" };
    } catch (error) {
        throw error;
    }
};

const findUser = async ({ payload }) => {
    const { googleId } = payload;
    try {
        const existingUser = await User.findOne({ googleId });
        if (existingUser) {
            return { res: "true" };
        }
        return { res: "false" };
    } catch (error) {
        throw error;
    }
};

export default {
    signup, findUser
};
