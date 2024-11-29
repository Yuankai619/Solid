import express from "express";
import { create, findByOwner, deleteByOwner, join } from "../controller/conversation.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/", ProtectRoute, create);
router.get("/owner/:userId", ProtectRoute, findByOwner);
router.delete("/:conversationId", ProtectRoute, deleteByOwner);
router.post("/:conversationId/join", ProtectRoute, join);
export default router;
