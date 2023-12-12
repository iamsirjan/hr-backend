import express from "express";
const router = express.Router();

import {
  createPosition,
  deletePosition,
  getAllPosition,
  getPositionById,
  updatePosition,
} from "../controllers/positionController";
import { authenticateUser, isAdmin } from "../middleware/authMiddleWare";

router.get("/", authenticateUser, getAllPosition);
router.post("/", isAdmin, createPosition);
router.delete("/:id", isAdmin, deletePosition);
router.put("/:id", isAdmin, updatePosition);
router.get("/:id", authenticateUser, getPositionById);
export = router;
