const router = require("express").Router();
const { ObjectId } = require("mongodb");
const recipesQuery = require("../queries/findRecipes");

router.post("/", postRecipe);
router.get("/", getRecipes);
router.post("/filtered", getFilteredRecipes);
router.get("/random", getRandomRecipe);
router.get("/:id", getRecipe);

async function getRecipes(req, res) {
  const db = req.app.get("mongoDB");
  const recipes = await db.collection("recipes").find().toArray();
  res.json(recipes);
}

async function getRandomRecipe(req, res) {
  const db = req.app.get("mongoDB");
  const recipe = await db.collection("recipes").aggregate([{ $sample: { size: 1 } }]).next();
  res.json(recipe);
}

async function getRecipe(req, res) {
  const db = req.app.get("mongoDB");
  const { id } = req.params;
  const recipe = await db.collection("recipes").findOne({ _id: ObjectId(id) });
  res.json(recipe);
}

async function getFilteredRecipes(req, res) {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.sendStatus(400);
  }
  const db = req.app.get("mongoDB");
  const query = recipesQuery(ingredients);
  const recipes = await db.collection("recipes").find(query).toArray();
  return res.status(200).json(recipes);
}

async function postRecipe(req, res) {
  const db = req.app.get("mongoDB");
  const recipe = await db.collection("recipes").insertOne({
    dishName: req.body.dishName,
    shortDescription: req.body.shortDescription,
    cookingTime: req.body.cookingTime,
    portionsNumber: req.body.portionsNumber,
    description: req.body.description,
    ingredients: req.body.ingredients,
  });
  res.status(201).json({
    id: recipe.insertedId,
  });
}

module.exports = router;
