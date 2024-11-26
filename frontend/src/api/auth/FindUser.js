import { API } from "../axios.config";
import { useAuth } from "../../context/AuthContext";
export const FindUser = async (googleId) => {
    console.log("fetch FindUser: ", googleId);
    return Promise.resolve("false"); // 模拟返回值
    const { token } = useAuth();
    try {
        // const res = await API.post(`/auth/user/find`, {
        //     googleId: googleId,
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // });
        // return res.data;
    } catch (error) {
        console.error("Find user error: ", error);
        return Promise.resolve("false");
    }
}