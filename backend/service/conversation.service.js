import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
const createConversation = async ({ payload }) => {
    const { ownerId, state, title, description, participants, messages } =
        payload;
    console.log("create Converation payload: ", payload);
    try {
        const newConversation = new Conversation({
            ownerId,
            state,
            title,
            description,
            participants,
            messages,
        });
        const savedConversation = await newConversation.save();
        const res = {
            title: savedConversation.title,
            state: savedConversation.state,
            _id: savedConversation._id,
        }
        return { status: "success", data: res };

    } catch (error) {
        throw error;
    }
};

const findConversationByOwner = async (userId) => {
    try {
        console.log("findConversationByOwner userId: ", userId);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error("Invalid userId format");
            error.status = 400;
        }

        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        const conversations = await Conversation.find({ ownerId: userId })
            .select("title state _id")
            .sort({ createdAt: -1 });

        return conversations;
    } catch (error) {
        console.error("Find conversation error: ", error);
        throw error;
    }
}

export default {
    createConversation,
    findConversationByOwner
};
