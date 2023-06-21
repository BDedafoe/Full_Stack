import express from 'express';
import { getMessages, createMessage, getUserMessages, deleteMessage, updateMessage } from "../controllers/messages.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/", verifyToken, getMessages);
router.get("/:userId/messages", verifyToken, getUserMessages);
router.post("/", verifyToken, createMessage);
router.delete("/:id", verifyToken, deleteMessage);
router.put("/:id", verifyToken, updateMessage);

export default router;