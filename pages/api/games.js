import { Game } from "@/models/Game";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Game.findOne({ _id: req.query.id }));
    } else {
      res.json(await Game.find());
    }
  }

  if (method === "POST") {
    const {
      title,
      desciption,
      price,
      discount,
      requirement,
      contruction,
      images,
      category,
    } = req.body;
    const GameDoc = await Game.create({
      title,
      desciption,
      price,
      discount,
      requirement,
      contruction,
      images,
      category,
    });
    res.json(GameDoc);
  }

  if (method === "PUT") {
    const {
      title,
      desciption,
      price,
      discount,
      requirement,
      contruction,
      images,
      category,
      _id,
    } = req.body;
    await Game.updateOne(
      { _id },
      {
        title,
        desciption,
        price,
        discount,
        requirement,
        contruction,
        images,
        category,
      },
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Game.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
