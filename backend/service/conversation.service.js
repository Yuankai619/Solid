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

const deleteConversationByOwner = async (conversationId, userId, googleId) => {
    try {
        console.log("deleteConversationByOwner req data:  ", userId, conversationId, googleId);
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(conversationId)) {
            const error = new Error("Invalid userId or conversationId format");
            error.status = 400;
            throw error;
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            ownerId: userId
        }).populate("ownerId", "googleId");
        if (!conversation || conversation.ownerId.googleId !== googleId) {
            const error = new Error('Conversation not found or unauthorized');
            error.status = 404;
            throw error;
        }

        await conversation.deleteOne({ _id: conversationId });

        return {
            status: "success",
            data: {
                _id: conversationId,
            }
        };
    } catch (error) {
        console.error("Delete conversation error: ", error);
        throw error;
    }
}
const joinConversation = async (conversationId, userId) => {
    try {
        console.log("joinConversation conversationId: ", conversationId, "userId: ", userId);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error("Invalid userId");
            error.status = 400;
            throw error;
        }
        const [conversations, userExists] = await Promise.all([
            Conversation.find().select("ownerId title state _id participants"),
            User.exists({ _id: userId })
        ]);
        const conversation = conversations.find(conv =>
            conv._id.toString().endsWith(conversationId)
        );

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
        if (conversation.participants.includes(userId)) {
            const error = new Error("User already in conversation");
            error.status = 400;
            throw error;
        }

        conversation.participants.push(userId);
        await conversation.save();

        return {
            status: "success",
            data: {
                ownerId: conversation.ownerId,
                title: conversation.title,
                state: conversation.state,
                _id: conversation._id.toString().slice(-6),
            }
        };
    } catch (error) {
        console.error("Join conversation error: ", error);
        throw error;
    }
}
const findConversationByParticipant = async (userId) => {
    try {
        console.log("findConversationByParticipant userId: ", userId);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error("Invalid userId format");
            error.status = 400;
            throw error;
        }

        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        const conversations = await Conversation.find({
            participants: { $in: [userId] }
        })
            .select("ownerId title state _id")
            .populate("ownerId", "userName")
            .sort({ updatedAt: -1 })
            .lean();

        return conversations;
    } catch (error) {
        console.error("Find conversation error: ", error);
        throw error;
    }
}

const getConversationInfo = async (conversationId) => {
    try {
        console.log("getConversationInfo conversationId: ", conversationId);
        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            const error = new Error("Invalid userId");
            error.status = 400;
            throw error;
        }
        const conversation = Conversation.findById(conversationId).select("_id, ownerId title state participants description createdAt");

        if (!conversation) {
            const error = new Error("Conversation not found");
            error.status = 404;
            throw error;
        }

        return conversation;
    } catch (error) {
        console.error("Get conversation info error: ", error);
        throw error;
    }
}

export default {
    createConversation,
    findConversationByOwner,
    deleteConversationByOwner,
    joinConversation,
    findConversationByParticipant,
    getConversationInfo
};
