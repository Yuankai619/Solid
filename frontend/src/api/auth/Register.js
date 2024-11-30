import { API } from "../axios.config";
export const Register = async (payload, token) => {
    try {
        const res = await API.post(
            `/v1/auth/register`,
            { payload },
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