import express from "express";
import { register, findUser } from "../controller/auth.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/register", ProtectRoute, register);
router.post("/user/find", ProtectRoute, findUser);

export default router;