import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

const sendMessage = async ({ payload }) => {
    try {
        const { conversationId } = payload.params;
        const { senderId, content, isAnonymous } = payload.body;
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(conversationId)) {
            const error = new Error("Invalid senderId or conversationId format");
            error.status = 400;
            throw error;
        }
        const [conversation, userExists] = await Promise.all([
            Conversation.findById(conversationId).select("ownerId state participants"),
            User.findById(senderId),
        ]);

        if (!conversation) {
            const error = new Error("Conversation not found");
            error.status = 404;
            throw error;
        }
        if (!userExists) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        if (conversation.state === "false") {
            const error = new Error("Conversation is closed");
            error.status = 400;
            throw error;
        }
        if (!conversation.participants.includes(senderId)) {
            const error = new Error("User is not a participant of this conversation");
            error.status = 400;
            throw error;
        }
        const newMessage = new Message({
            senderId,
            conversationId,
            content,
            isAnonymous,
            score: "null",
        });

        const [savedMessage] = await Promise.all([
            newMessage.save(),
            conversation.updateOne({ $push: { messages: newMessage._id } }),
        ]);
        const populatedMessage = await Message.findById(savedMessage._id).populate("senderId", "userName avatarUrl");
        return {
            status: "success",
            data: populatedMessage,
        };
    } catch (error) {
        console.error("Send message error: ", error);
        throw error;
    }
};


export default {
    sendMessage,
};