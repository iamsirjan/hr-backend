// models/employee.model.ts
import { Document, Schema, model, Model } from "mongoose";
import { IDepartmentModel } from "./department.model";
import { IRole } from "./role.model";

interface Employee extends Document {
  name: string;
  email: string;
  password: string;
  position: string;
  department: Schema.Types.ObjectId | IDepartmentModel; // Reference to the Department model
  phone: string;
  emergencyPhone: string;
  address: string;
  panNumber: string;
  image: string;
  bloodGroup: string;
  role: Schema.Types.ObjectId | IRole;
}

const employeeSchema = new Schema<Employee>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  phone: String,
  emergencyPhone: String,
  address: String,
  panNumber: String,
  image: String,
  bloodGroup: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

export default model<Employee>("Employee", employeeSchema);
