import { API } from "../axios.config";
export const FindUser = async (googleId, token) => {
    try {
        const res = await API.post(
            `/v1/auth/user/find`,
            { googleId },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error("Find user error: ", error);
        throw error;
    }
}