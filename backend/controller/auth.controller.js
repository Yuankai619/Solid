import authService from '../service/auth.service.js';
export const register = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const message = await authService.register(req.body);
        console.log("message", message);
        return res.status(201).json({ message });
    } catch (error) {
        if (error.message === "User already exists") {
            return res.status(error.status).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const findUser = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const user = await authService.findUser({ payload: req.body });
        console.log("user", user);
        return res.status(200).json(user);
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}