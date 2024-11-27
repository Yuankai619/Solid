import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const register = async ({ payload }) => {
    console.log("payload", payload);
    const { userName, realName, email, studentId = "", avatarUrl, googleId } = payload;
    try {
        const existingUser = await User.findOne({ email });
        console.log("existingUser", existingUser);
        if (existingUser) {
            console.log("User already exists");
            const error = new Error("User already exists");
            error.status = 409;
            throw error;
        }

        if (userName === '' || realName === '' || email === '' || googleId === '' || googleId === '' || userName.length > 10 || realName.length > 10 || studentId.length > 10) {
            const error = new Error("Invalid input");
            error.status = 400;
            throw error;
        }

        // const salt = await bcrypt.genSalt(12);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            realName,
            email,
            studentId,
            // password: hashedPassword,
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
    register, findUser
};
