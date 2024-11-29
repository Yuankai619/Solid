import messageService from "../service/message.service.js";
export const send = async (req, res) => {
    try {
        const message = await messageService.sendMessage(
            req.body
        );
        return res.status(201).json(message);
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