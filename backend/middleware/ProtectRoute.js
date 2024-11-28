import admin from "../service/firebase.service.js";
const ProtectRoute = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1]; // Bearer token
        token = token.trim();
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken) {
            req.user = decodedToken;
            return next();
        }
        return res.json({ message: "Unauthorized" });
    } catch (error) {
        return res.json({ message: "Unauthorized" });
    }
};

export default ProtectRoute;
