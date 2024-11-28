import Conversation from "../models/conversation.model.js";

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
        await newConversation.save();
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

export default {
    createConversation,
};
