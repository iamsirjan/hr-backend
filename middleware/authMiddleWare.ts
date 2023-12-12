// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import employeeModel, { IEmployee } from "../models/employee.model";
import { IRole } from "../models/role.model";

interface AuthenticatedRequest extends Request {
  user?: {
    role: {
      name: string;
    };
  };
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }
    const user = await employeeModel
      .findOne({
        email: decoded.email,
      })
      .populate("role");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const roleName = (user.role as IRole)?.name || "";

    req.user = {
      role: {
        name: roleName,
      },
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Use the isAuth middleware to first check if the user is authenticated
    authenticateUser(req, res, async () => {
      if (req?.user?.role?.name === "user") {
        // User is an admin, allow access
        next();
      } else {
        // User is not an admin, deny access
        return res.status(403).json({ error: "Permission denied" });
      }
    });
  } catch (e) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
};
