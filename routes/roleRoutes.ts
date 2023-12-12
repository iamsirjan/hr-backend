import express from "express";

const router = express.Router();
import {
  createRole,
  getAllRole,
  findRoleById,
  updateRole,
  deleteRole,
} from "../controllers/roleController";
import { authenticateUser, isAdmin } from "../middleware/authMiddleWare";

router.get("/", authenticateUser, getAllRole);
router.get("/:id", authenticateUser, findRoleById);
router.post("/", isAdmin, createRole);
router.put("/:id", isAdmin, updateRole);
router.delete("/:id", isAdmin, deleteRole);

export = router;
