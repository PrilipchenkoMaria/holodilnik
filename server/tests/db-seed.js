const { before } = require("mocha");
const { ObjectId } = require("mongodb");
const dataBase = require("../services/dataBase");

before(async () => {
  process.env.TEST_USER_ID = testUserId;
  process.env.TEST_RECIPE_ID = testRecipeId;

  await dataBase.connect();
  await dataBase.collection("users").insertOne(testUser);
  await dataBase.collection("ingredients").insertOne({ ingredients });
  await dataBase.collection("recipes").insertOne(testRecipe);
});

const testUserId = "92815ae62043fb10d750f784";
const testRecipeId = "5e769d933890ec07187063f0";

const testUser = {
  _id: testUserId,
  username: "test",
  email: "test@gmail.com",
  password: "test",
  ingredients: [
    {
      name: "Творог",
      weight: 500,
    },
    {
      name: "Сахар",
      weight: 5,
    },
  ],
};

const ingredients = [
  {
    name: "Пшеничная мука",
    weight: 400,
    measure: "",
  },
  {
    name: "Сливочное масло",
    weight: 250,
    measure: "",
  },
  {
    name: "Яйцо куриное",
    weight: 150,
    measure: "1 штука = 50 г",
  },
  {
    name: "Тыква",
    weight: 900,
    measure: "",
  },
  {
    name: "Сахар",
    weight: 200,
    measure: "",
  },
  {
    name: "Сливки 30%-ные",
    weight: 206,
    measure: "100 мл = 103 г",
  },
];

const testRecipe = {
  _id: ObjectId(testRecipeId),
  dishName: "American pie",
  portionsNumber: "8 portions",
  shortDescription: "shortDescription",
  cookingTime: "PT2H",
  ingredients,
  optionalIngredients: [
    "Корица",
    "Ванилин",
    "Соль",
  ],
  description: [
    "description 1",
    "description 2",
  ],
  imageUrl: "imageUrl.jpg",
};
