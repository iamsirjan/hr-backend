import { Schema, model } from "mongoose";

export interface IPosition extends Document {
  name: string;
}

const PositionSchema = new Schema<IPosition>(
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

export default model<IPosition>("Position", PositionSchema);
