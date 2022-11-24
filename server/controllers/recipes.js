const router = require("express").Router();
const { ObjectId } = require("mongodb");
const { getRecipesMatchingQuery, getRecipePublishedOrFilter, recipeStateEnum } = require("../queries/findRecipes");

router.post("/", postRecipe);
router.put("/review", reviewRecipe);
router.get("/", getRecipes);
router.post("/filtered", getFilteredRecipes);
router.get("/random", getRandomRecipe);
router.get("/:id", getRecipe);

async function getRecipes(req, res) {
  const db = req.app.get("mongoDB");
  const recipes = await db.collection("recipes").find(getRecipePublishedOrFilter(req.userId)).toArray();
  res.json(recipes);
}

async function getRandomRecipe(req, res) {
  const db = req.app.get("mongoDB");
  const recipe = await db.collection("recipes")
    .aggregate([
      { $match: getRecipePublishedOrFilter(req.userId) }, { $sample: { size: 1 } },
    ]).next();
  res.json(recipe);
}

async function getRecipe(req, res) {
  const db = req.app.get("mongoDB");
  const { id } = req.params;
  const recipe = await db.collection("recipes")
    .findOne({ _id: ObjectId(id), ...getRecipePublishedOrFilter(req.userId) });
  res.json(recipe);
}

async function getFilteredRecipes(req, res) {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.sendStatus(400);
  }
  const db = req.app.get("mongoDB");
  const query = getRecipesMatchingQuery(ingredients, req.userId);
  const recipes = await db.collection("recipes").find(query).toArray();
  return res.status(200).json(recipes);
}

async function reviewRecipe(req, res) {
  const db = req.app.get("mongoDB");
  const { id, state } = req.body;
  const mappedState = recipeStateEnum[state];

  if (
    mappedState !== recipeStateEnum.published
      && mappedState !== recipeStateEnum.rejected
  ) return res.status(400).json({ message: "Invalid payload" });

  const updateResponse = await db.collection("recipes").updateOne(
    { _id: ObjectId(id), state: recipeStateEnum.review },
    { $set: { state: mappedState } },
    { upsert: false },
  );

  return res.json({
    modified: !!updateResponse.modifiedCount,
    state,
  });
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
    state: recipeStateEnum.review,
    createdBy: ObjectId(req.userId),
  });
  res.status(201).json({
    id: recipe.insertedId,
  });
}

module.exports = router;
