import { API } from "../axios.config";
export const deleteConversation = async (userId, conversationId, googleId, token) => {
    try {
        const res = await API.delete(
            `/v1/conversations/${conversationId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    userId,
                    googleId,
                }
            }
        );
        return res.data;
    } catch (error) {
        const { status, data } = error.response;
        if (status === 404) {
            throw new Error('User not found');
        } else if (status === 401) {
            throw new Error('Unauthorized access');
        }
        throw new Error(data.message || 'Failed to get conversations');
    }
};
