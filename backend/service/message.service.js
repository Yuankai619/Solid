import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
const sendMessage = async (payload, conversationId) => {
    try {
        console.log("send message payload: ", payload, "conversationId: ", conversationId);
        const { userId, content, isAnonymous } = payload;
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(conversationId)) {
            const error = new Error("Invalid senderId or conversationId format");
            error.status = 400;
            throw error;
        }
        const [conversation, userExists] = await Promise.all([
            Conversation.findById(conversationId).select("ownerId state participants"),
            User.findById(userId),
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
        if (!conversation.participants.includes(userId) && conversation.ownerId.toString() !== userId) {
            const error = new Error("User is not a participant of this conversation");
            error.status = 400;
            throw error;
        }
        const newMessage = new Message({
            senderId: userId,
            conversationId,
            content,
            isAnonymous,
            score: "null",
        });

        const savedMessage = await newMessage.save();
        await conversation.updateOne({ $push: { messages: newMessage._id } });
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

const getMessages = async (conversationId, page, limit) => {
    try {
        console.log("get messages conversationId: ", conversationId, "page: ", page, "limit: ", limit);
        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            const error = new Error("Invalid conversationId format");
            error.status = 400;
            throw error;
        }
        const conversation = await Conversation.findById(conversationId).select("messages");
        if (!conversation) {
            const error = new Error("Conversation not found");
            error.status = 404;
            throw error;
        }
        const messages = await Message.find({ _id: { $in: conversation.messages } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("senderId", "userName avatarUrl");

        const totalMessages = conversation.messages.length;
        console.log("totalMessages: ", totalMessages);
        return {
            status: "success",
            data: {
                messages,
                currentPage: page,
                totalPages: Math.ceil(totalMessages / limit),
                hasMore: totalMessages > page * limit,
            }
        };
    } catch (error) {
        console.error("Get messages error: ", error);
        throw error;
    }
};
export default {
    sendMessage,
    getMessages
};