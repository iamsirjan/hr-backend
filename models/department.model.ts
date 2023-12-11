// models/department.model.ts
import { Document, Schema, model } from "mongoose";

export interface IDepartmentModel extends Document {
  name: string;
}

const departmentSchema = new Schema<IDepartmentModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const DepartmentModel = model<IDepartmentModel>("Department", departmentSchema);

export default DepartmentModel;
