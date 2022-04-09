const router = require("express").Router();
const { ObjectId } = require("mongodb");

router.get("/auth", verificationResponse);
router.put("/ingredients", putUserIngredients);
router.get("/ingredients", getUserIngredients);
router.put("/recipe/prepare", prepareRecipe);

function verificationResponse(req, res) {
  return res.sendStatus(200);
}

async function putUserIngredients(req, res) {
  const db = req.app.get("mongoDB");
  await upsertUserIngredients({ db, ingredients: req.body.ingredients, userId: req.userId });
  return res.status(200).json();
}

async function getUserIngredients(req, res) {
  const db = req.app.get("mongoDB");
  const obj = await db.collection("users").findOne({ _id: ObjectId(req.userId) });
  res.json(obj.ingredients);
}

async function prepareRecipe(req, res) {
  const db = req.app.get("mongoDB");
  const { ingredients, recipeId } = req.body;
  const recipe = await db.collection("recipes").findOne({ _id: ObjectId(recipeId) });

  if (!recipe) return res.sendStatus(404);

  const updatedIngredients = [];
  ingredients.forEach((ingredient) => {
    const ingredientInRecipe = recipe.ingredients.find(({ name }) => name === ingredient.name);

    if (!ingredientInRecipe) updatedIngredients.push(ingredient);
    else if (ingredientInRecipe.weight < ingredient.weight) {
      updatedIngredients.push(
        { ...ingredient, weight: ingredient.weight - ingredientInRecipe.weight },
      );
    }
  });

  await upsertUserIngredients({ db, ingredients: updatedIngredients, userId: req.userId });

  return res.status(200).json({ ingredients: updatedIngredients });
}

async function upsertUserIngredients({ db, ingredients, userId }) {
  await db.collection("users").updateOne(
    { _id: ObjectId(userId) },
    { $set: { ingredients } },
    { upsert: true },
  );
}

module.exports = router;
