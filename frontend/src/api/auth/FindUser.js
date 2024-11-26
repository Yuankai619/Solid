import { API } from "./axios.config";
import { useAuth } from "../../context/AuthContext";
export const FindUser = async (googleId) => {
    const { token } = useAuth();
    try {
        const res = await API.post(`/auth/user/find`, {
            googleId: googleId,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Find user error: ", error);
        return "false";
    }
}