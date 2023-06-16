import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/", verifyToken, createUser);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;