import express from "express";

const router = express.Router();
import {
  createRole,
  getAllRole,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/roleController";

router.get("/", getAllRole);
router.get("/:id", getRoleById);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);
