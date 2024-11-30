import { API } from "../axios.config";
export const joinConversation = async (conversationId, userId, token) => {
    try {
        const res = await API.post(
            `/v1/conversations/${conversationId}/join`,
            { userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Find user error: ", error);
        throw error;
    }
};
