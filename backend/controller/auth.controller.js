import authService from '../service/auth.service.js';
export const signup = async (req, res) => {
    try {
        // console.log("req.body", req.body);
        const message = await authService.signup({ payload: req.body });
        // console.log("message", message);
        res.status(201).json({ message });
    } catch (error) {
        if (error.message === "User already exists") {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const findUser = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const message = await authService.findUser({ payload: req.body });
        console.log("message", message);
        return res.status(200).json({ message });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}