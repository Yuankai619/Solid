import { API } from "../axios.config";
export const createConversation = async (payload, token) => {
    try {
        const res = await API.post(
            `/v1/conversations`,
            { payload },
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
