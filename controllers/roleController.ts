import { Request, Response } from "express";
import Role, { IRole } from "../models/role.model";
import roleModel from "../models/role.model";

export const getAllRole = async (req: Request, res: Response) => {
  try {
    // Retrieve all roles
    const roles: IRole[] = await Role.find();

    res.status(200).json({ roles });
  } catch (error) {
    console.error("Error getting roles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Check if a role with the same name already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res
        .status(400)
        .json({ error: "Role with this name already exists" });
    }

    // Create a new role
    const newRole: IRole = await Role.create({ name });

    res
      .status(201)
      .json({ data: newRole, message: "Role created successfully" });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingRole = await Role.findById(id);

    if (!existingRole) {
      return res.status(404).json({ error: "Role not found" });
    }
    existingRole.name = name;
    const updateRole = await existingRole.save();

    res.status(200).json({
      data: updateRole,
      message: "Role updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.id;

    // Check if the provided ID is valid
    if (!roleId) {
      return res.status(400).json({ error: "Role ID is required" });
    }

    // Find the role by ID and delete it
    const deletedRole = await Role.findOneAndDelete({ _id: roleId });

    // Check if the role was found and deleted
    if (!deletedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      return res.status(400).json({ error: "Role Id is required" });
    }

    const Role = await roleModel.findById(roleId);

    if (!Role) {
      return res.status(400).json({ error: "Role not found" });
    }

    res.status(200).json({ data: Role });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
