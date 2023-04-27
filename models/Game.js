const { Schema, model, models } = require("mongoose");

const GameShema = new Schema(
  {
    title: { type: String, required: true },
    desciption: String,
    price: { type: Number, required: true },
    requirement: { type: String, required: true },
    contruction: { type: String, required: true },
    images: {
      type: [String],
    },
  },
  { timestamps: true },
);

export const Game = models.Game || model("Game", GameShema);
