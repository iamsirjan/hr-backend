import { Schema, model } from "mongoose";

export interface IRole extends Document {
  name: string;
  isNew: boolean;
  _id: number;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default model<IRole>("Role", RoleSchema);
