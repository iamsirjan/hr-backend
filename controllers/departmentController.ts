import { Request, Response } from "express";
import DepartmentModel, { IDepartmentModel } from "../models/department.model";

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const existingDepartment = await DepartmentModel.findOne({ name });
    if (existingDepartment) {
      return res
        .status(400)
        .json({ error: "Department with this name already exists" });
    }
    const newDepartment: IDepartmentModel = await DepartmentModel.create({
      name,
    });
    res.status(201).json({
      data: newDepartment,
      message: "Department created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllDepartment = async (req: Request, res: Response) => {
  try {
    const department: IDepartmentModel[] = await DepartmentModel.find();
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const departmentId = req.params.id;
    if (!departmentId) {
      return res.status(400).json({ error: "Department Id is required" });
    }
    const deleteDepartment = await DepartmentModel.findOneAndDelete({
      _id: departmentId,
    });
    if (!deleteDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updatedDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingDepartment = await DepartmentModel.findById(id);

    if (!existingDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }

    existingDepartment.name = name;
    const updatedDepartment = await existingDepartment.save();

    res.status(200).json({
      data: updatedDepartment,
      message: "Department updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const departmentId = req.params.id;

    if (!departmentId) {
      return res.status(400).json({ error: "Department ID is required" });
    }

    const department = await DepartmentModel.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ data: department });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
