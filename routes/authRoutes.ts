// routes/authRoutes.ts
import express from "express";
const router = express.Router();
import { getUserById, login, register } from "../controllers/authController";
import { authenticateUser } from "../middleware/authMiddleWare";

router.post("/register", register);
router.post("/login", login);
router.get("/user", authenticateUser, getUserById);

export = router;
