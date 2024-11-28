import express from "express";
import { create } from "../controller/conversation.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/", ProtectRoute, create);
// router.get("/owner/{owenerId}/all", ProtectRoute, findUser);
export default router;
