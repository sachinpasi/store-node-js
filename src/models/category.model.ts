import mongoose, { Schema } from "mongoose";
import { ICategory } from "../typings/types";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
