import mongoose, { Schema } from "mongoose";
import { IBrand } from "../typings/types";

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Brand = mongoose.model("Brand", brandSchema);
