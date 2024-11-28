import express from "express";
import { create, findByOwner, deleteByOwner } from "../controller/conversation.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/", ProtectRoute, create);
router.get("/owner/:userId", ProtectRoute, findByOwner);
router.delete("/ower/:userId/:conversationId", ProtectRoute, deleteByOwner);
export default router;
