import mongoose, { Schema, model, models } from "mongoose";

const CategoryShema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true },
);

export const Category = models?.Category || model("Category", CategoryShema);
