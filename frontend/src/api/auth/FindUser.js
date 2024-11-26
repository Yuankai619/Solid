import axios from "axios";
import { API } from "./axios.config";
export const FindUser = async (googleId) => {
    const res = await API.post(`/auth/user/find`, {
        googleId: googleId,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    },
    );
}