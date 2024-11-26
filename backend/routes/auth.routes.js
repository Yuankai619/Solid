import express from "express";
import { signup, findUser } from "../controller/auth.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/user/find", ProtectRoute, findUser);

export default router;