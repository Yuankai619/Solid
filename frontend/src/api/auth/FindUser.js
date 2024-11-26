import { API } from "../axios.config";
export const FindUser = async (googleId, token) => {
    try {
        const res = await API.post(
            `/v1/auth/user/find`,
            { googleId }, // 請求體只包含 googleId
            {
                headers: {
                    "Authorization": `Bearer ${token}` // headers 作為第三個參數
                }
            }
        );

        return res.data;
    } catch (error) {
        console.error("Find user error: ", error);
        return Promise.resolve("false");
    }
}