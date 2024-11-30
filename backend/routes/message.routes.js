import express from "express";
import { send, get } from "../controller/message.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/:conversationId", ProtectRoute, send);

router.get("/:conversationId", ProtectRoute, get);
export default router;
