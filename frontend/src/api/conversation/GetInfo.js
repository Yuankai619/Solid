import { API } from "../axios.config";
export const getInfo = async (conversationId, token) => {
    try {
        const res = await API.get(
            `/v1/conversations/${conversationId}/info`,
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
