const bodyParser = require("body-parser");
const express = require("express");
require("express-async-errors");

const app = express();
const dataBase = require("./services/dataBase");
const checkUserId = require("./middlewares/checkUserId");
const user = require("./controllers/user");
const auth = require("./controllers/auth");
const recipes = require("./controllers/recipes");
const ingredients = require("./controllers/ingredients");

app.set("mongoDB", dataBase);

app.use(bodyParser.json());
app.use((req, res, next) => dataBase.connect().then(next));

app.use("/api/user", checkUserId);

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/recipes", recipes);
app.use("/api/ingredients", ingredients);

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).json({
      message: `${err}`,
    });
  }
  next(err);
});

app.run = () => app.listen(3001, () => {
  console.info("JSON Server is running");
});

module.exports = app;
