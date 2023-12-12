// controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employee, { IEmployee } from "../models/employee.model";
import employeeModel from "../models/employee.model";
import { decryptToken } from "../utility/decryptToken";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      position,
      department,
      phone,
      emergencyPhone,
      address,
      panNumber,
      image,
      bloodGroup,
      role,
    } = req.body;

    // Check if the email is already registered
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee instance
    const newEmployee: IEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      position,
      department,
      phone,
      emergencyPhone,
      address,
      panNumber,
      image,
      bloodGroup,
      role,
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Respond with a success message
    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the employee by email
    const employee = await Employee.findOne({ email })
      .populate("position")
      .populate("department")
      .populate("role");

    // Check if the employee exists
    if (!employee) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, employee.password);

    // Check if passwords match
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: employee._id, email: employee.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Respond with the JWT token
    res.status(200).json({
      data: employee,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }
  const decrypt = decryptToken(token);
  try {
    const userId = decrypt?.userId;
    if (!userId) {
      return res.status(400).json({ error: "User Id is required" });
    }
    const User = await employeeModel.findById(userId);
    console.log(User);

    if (!User) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ data: User });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
