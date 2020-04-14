const bodyParser = require("body-parser");
const express = require("express");
const { ObjectId } = require("mongodb");
const DataBase = require("./DataBase");
const { checkUserEmail } = require("./GetNewUserId");
const { getUserIdByToken } = require("./SignInVerification");
const { getUserIdByCreds } = require("./SignInVerification");
const { signToken } = require("./SignInVerification");
const { getNewUserId } = require("./GetNewUserId");

const app = express();

app.set("mongoDB", DataBase);

app.use(bodyParser.json());
app.use((req, res, next) => DataBase.connect().then(next));
app.use("/api/user", checkUserId);

app.post("/api/auth/signup", signUp);
app.post("/api/auth/signin", signIn);

app.get("/api/auth/user", getAuthUserId);

app.post("/api/recipes", postRecipe);
app.get("/api/recipes", getRecipes);
app.get("/api/recipes/random", getRandomRecipe);
app.get("/api/recipes/:id", getRecipe);

app.get("/api/ingredients", getIngredients);
app.put("/api/user/ingredients", putUserIngredients);
app.get("/api/user/ingredients", getUserIngredients);

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

async function getIngredients(req, res) {
  const db = req.app.get("mongoDB");
  const obj = await db.collection("ingredients").findOne({});
  res.json(obj.ingredients);
}

async function signUp(req, res) {
  try {
    const { login, email, password } = req.body;

    if (!login || !email || !password) {
      return res.status(400).json({
        message: "Invalid payload",
      });
    }
    const db = req.app.get("mongoDB");
    const userId = await checkUserEmail(db, email);
    if (userId) {
      return res.status(200).json({
        message: "This email already taken",
      });
    }
    const newUserId = await getNewUserId(db, login, email, password);
    const token = await signToken(newUserId);
    return res.status(201).json({
      message: "User created!",
      token,
      userId: newUserId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `${err}`,
    });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid payload",
      });
    }
    const db = req.app.get("mongoDB");
    const userId = await getUserIdByCreds(db, email, password);
    if (!userId) {
      return res.status(403).json({
        message: "Incorrect email or password",
      });
    }
    const token = await signToken(userId);
    return res.status(200).json({
      message: "Authentication successful!",
      token,
      userId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `${err}`,
    });
  }
}

async function checkUserId(req, res, next) {
  const userId = await getUserIdByToken(req);
  if (!userId) {
    return res.status(401).json({
      message: "Not authenticated",
      status: 401,
    });
  } return next();
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

async function putUserIngredients(req, res) {
  try {
    const userId = await getUserIdByToken(req);
    const db = req.app.get("mongoDB");
    await db.collection("users").updateOne({
      _id: ObjectId(userId),
    }, {
      $set: {
        ingredients: req.body.ingredients,
      },
    }, {
      upsert: true,
    });
    return res.status(200).json();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `${err}`,
    });
  }
}

async function getUserIngredients(req, res) {
  const userId = await getUserIdByToken(req);
  const db = req.app.get("mongoDB");
  const obj = await db.collection("users").findOne({ _id: ObjectId(userId) });
  res.json(obj.ingredients);
}

async function getAuthUserId(req, res) {
  const userId = await getUserIdByToken(req);
  if (!userId) {
    return res.status(401).json({
      message: "Not authenticated",
      status: 401,
    });
  }
  return res.status(200).json({
    userId,
  });
}

app.run = () => app.listen(3001, () => {
  console.info("JSON Server is running");
});

module.exports = app;
