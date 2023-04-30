import mongoose, { Schema, model, models } from "mongoose";

const GameShema = new Schema(
  {
    title: { type: String, required: true },
    desciption: String,
    price: { type: Number, required: true },
    discount: Number,
    requirement: { type: String, required: true },
    contruction: { type: String, required: true },
    images: {
      type: [String],
    },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
  },
  { timestamps: true },
);

export const Game = models.Game || model("Game", GameShema);
