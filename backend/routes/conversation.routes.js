import express from "express";
import {
    create,
    findByOwner,
    deleteByOwner,
    join,
    findByParticipant,
    getInfo,
} from "../controller/conversation.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/", ProtectRoute, create);
router.get("/owner/:userId", ProtectRoute, findByOwner);
router.delete("/:conversationId", ProtectRoute, deleteByOwner);
router.post("/:conversationId/join", ProtectRoute, join);
router.get("/participant/:userId", ProtectRoute, findByParticipant);
router.get("/:conversationId/info", ProtectRoute, getInfo);
export default router;
