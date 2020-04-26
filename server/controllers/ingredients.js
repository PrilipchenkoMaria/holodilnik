const router = require("express").Router();

router.get("/", getIngredients);

async function getIngredients(req, res) {
  const db = req.app.get("mongoDB");
  const obj = await db.collection("ingredients").findOne({});
  res.json(obj.ingredients);
}

module.exports = router;
