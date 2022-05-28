const { before } = require("mocha");
require("dotenv").config();
const app = require("./app.test");
const { newToken } = require("../services/security");

before(async () => {
  const { TEST_USER_ID } = process.env;
  token = await newToken(TEST_USER_ID);
});

describe("Api", () => {
  it("GET /api/recipes", () => app
    .request("GET", "/api/recipes")
    .expect(200)
    .expect("Content-Type", /json/));
  it("POST /api/recipes/filtered invalid", () => app
    .request("POST", "/api/recipes/filtered")
    .expect(400));
  it("POST /api/recipes/filtered valid", () => app
    .request("POST", "/api/recipes/filtered")
    .send(ingredients)
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.be.an("array")));
});

describe("Single recipe", () => {
  it("POST /api/recipes", () => app
    .request("POST", "/api/recipes")
    .set("Authorization", `Bearer ${token}`)
    .send(recipe)
    .expect(201)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.have.property("id")));

  it("GET /api/recipes/id", () => app
    .request("GET", `/api/recipes/${process.env.TEST_RECIPE_ID}`)
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.have.property("_id")));

  it("GET /api/recipes/random", () => app
    .request("GET", "/api/recipes/random")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.have.property("_id")));
});

let token;

const recipe = {
  dishName: "test",
  portionsNumber: 2,
  shortDescription: "test",
  cookingTime: 60,
  ingredients: [
    {
      name: "test",
      weight: 500,
      measure: "",
    },
  ],
  description: "test",
};
const ingredients = {
  ingredients: [
    {
      name: "Куриная печень",
      weight: 600,
    },
    {
      name: "Сметана",
      weight: 500,
    },
    {
      name: "Лук репчатый",
      weight: 75,
    },
    {
      name: "Сливочное масло",
      weight: 2000,
    },
  ],
};
