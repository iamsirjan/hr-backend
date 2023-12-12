// models/employee.model.ts
import { Document, Schema, model, Model } from "mongoose";
import { IDepartmentModel } from "./department.model";
import { IRole } from "./role.model";
import { IPosition } from "./position.model";

export interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  position: Schema.Types.ObjectId | IPosition;
  department: Schema.Types.ObjectId | IDepartmentModel; // Reference to the Department model
  phone: string;
  emergencyPhone: string;
  address: string;
  panNumber: string;
  image: string;
  bloodGroup: string;
  role: IRole | Schema.Types.ObjectId;
}

const employeeSchema = new Schema<IEmployee>({
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
    type: Schema.Types.ObjectId,
    ref: "Position",
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

export default model<IEmployee>("Employee", employeeSchema);
