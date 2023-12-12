import express from "express";
const router = express.Router();
import {
  createDepartment,
  deleteDepartment,
  getAllDepartment,
  getDepartmentById,
  updatedDepartment,
} from "../controllers/departmentController";
import { authenticateUser, isAdmin } from "../middleware/authMiddleWare";

router.get("/", authenticateUser, getAllDepartment);
router.post("/", isAdmin, createDepartment);
router.delete("/:id", isAdmin, deleteDepartment);
router.put("/:id", isAdmin, updatedDepartment);
router.get("/:id", authenticateUser, getDepartmentById);

export = router;
