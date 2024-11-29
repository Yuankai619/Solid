import express from "express";
import { send } from "../controller/message.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/:conversationId", ProtectRoute, send);

export default router;
