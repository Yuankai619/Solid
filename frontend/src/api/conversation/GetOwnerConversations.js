import { API } from "../axios.config";
export const getOwnerConversations = async (userId, token) => {
    try {
        const res = await API.get(
            `/v1/conversations/owner/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Get user conversations error:", error);

        if (error.response) {
            const { status, data } = error.response;
            if (status === 404) {
                throw new Error('User not found');
            } else if (status === 401) {
                throw new Error('Unauthorized access');
            }
            throw new Error(data.message || 'Failed to get conversations');
        }

        throw error;
    }
};
