import conversationService from "../service/conversation.service.js";
export const create = async (req, res) => {
    try {
        const conversation = await conversationService.createConversation(
            req.body
        );
        return res.status(201).json(conversation);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
