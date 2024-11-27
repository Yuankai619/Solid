import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isAnonymous: {
            type: String,
            required: true,
        },
        score: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
