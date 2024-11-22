import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const signup = async ({ payload }) => {
    console.log("payload", payload);
    const { userName, realName, email, studentId = "", password } = payload;
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
        });

        await newUser.save();
        return { message: "User created successful" };
    } catch (error) {
        throw error;
    }
}

export default {
    signup,
};