import { API } from "../axios.config";
export const getMessages = async (conversationId, page, limit, token) => {
    try {
        const res = await API.get(
            `/v1/messages/${conversationId}?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Get user conversations error:", error);
        throw error;
    }
};
