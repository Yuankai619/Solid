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

export const findByOwner = async (req, res) => {
    try {
        const conversations = await conversationService.findConversationByOwner(
            req.params.userId
        );
        return res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        } else if (error.status === 400) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}

export const deleteByOwner = async (req, res) => {
    console.log("deleteByOwner req data: ", req.params.userId, req.params.conversationId, req.body);
    try {
        const conversation = await conversationService.deleteConversationByOwner(
            req.params.conversationId,
            req.body.userId,
            req.body.googleId,
        );
        return res.status(200).json(conversation);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        } else if (error.status === 400) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}

export const join = async (req, res) => {
    try {
        const conversation = await conversationService.joinConversation(
            req.params.conversationId,
            req.body.userId
        );
        return res.status(200).json(conversation);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        } else if (error.status === 400) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}

export const findByParticipant = async (req, res) => {
    try {
        const conversations = await conversationService.findConversationByParticipant(
            req.params.userId
        );
        return res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        } else if (error.status === 400) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}