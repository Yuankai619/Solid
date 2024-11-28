import express from "express";
import { create, findByOwner } from "../controller/conversation.controller.js";
import ProtectRoute from "../middleware/ProtectRoute.js";
const router = express.Router();

router.post("/", ProtectRoute, create);
router.get("/owner/:userId", ProtectRoute, findByOwner);
export default router;
