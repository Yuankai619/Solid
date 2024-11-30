import { API } from "../axios.config";
export const sendMessage = async (payload, conversationId, token) => {
    try {
        const res = await API.post(
            `/v1/messages/${conversationId}`,
            { payload },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Send message error: ", error);
        throw error;
    }
};
