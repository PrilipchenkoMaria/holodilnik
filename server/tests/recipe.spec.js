const { before } = require("mocha");
require("dotenv").config();
const app = require("./app.test");
const { newToken } = require("../services/security");
const { recipeStateEnum } = require("../queries/findRecipes");

before(async () => {
  const { TEST_USER_ID } = process.env;
  token = await newToken(TEST_USER_ID);
});

describe("Api", () => {
  it("GET /api/recipes", () => app
    .request("GET", "/api/recipes")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      res.body.should.be.an("array");
      res.body.should.have.length(1);
    }));
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
  describe("GET /api/recipes/id", () => {
    [
      [
        "published recipe",
        "PUBLISHED_RECIPE_ID",
        (res) => { res.body.should.have.property("_id"); },
      ],
      [
        "draft recipe",
        "DRAFT_RECIPE_ID",
        (res) => { res.should.have.property("body", null); },
      ],
      [
        "review recipe",
        "REVIEW_RECIPE_ID",
        (res) => { res.should.have.property("body", null); },
      ],
      [
        "rejected recipe",
        "REJECTED_RECIPE_ID",
        (res) => { res.should.have.property("body", null); },
      ],
    ].forEach(([caseName, envIndex, assertResponseBody]) => it(
      caseName, () => app
        .request("GET", `/api/recipes/${process.env[envIndex]}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => assertResponseBody(res)),
    ));
  });

  it("POST /api/recipes", () => app
    .request("POST", "/api/recipes")
    .set("Authorization", `Bearer ${token}`)
    .send(recipe)
    .expect(201)
    .expect("Content-Type", /json/)
    .then((res) => {
      res.body.should.have.property("id");
      return res.body.id;
    })
    .then((id) => app.request("GET", `/api/recipes/${id}`).set("Authorization", `Bearer ${token}`))
    .then((res) => {
      res.body.should.have.property("state", recipeStateEnum.review);
      res.body.should.have.property("createdBy", process.env.TEST_USER_ID);
    }));

  describe("PUT /api/recipes/review", () => {
    [
      [
        "publish recipe",
        "REVIEW_RECIPE_ID",
        "published",
        (body) => body.should.eql({ modified: true, state: "published" }),
        200,
      ],
      [
        "reject recipe",
        "REVIEW_RECIPE_ID",
        "rejected",
        (body) => body.should.eql({ modified: false, state: "rejected" }),
        200,
      ],
      [
        "recipe to draft",
        "DRAFT_RECIPE_ID",
        "draft",
        (body) => body.should.eql({ message: "Invalid payload" }),
        400,
      ],
    ].forEach(([caseName, envIndex, state, assertResponseBody, status]) => it(
      caseName, () => app
        .request("PUT", "/api/recipes/review")
        .set("Authorization", `Bearer ${token}`)
        .send({ id: process.env[envIndex], state })
        .expect(status)
        .expect("Content-Type", /json/)
        .then(({ body }) => assertResponseBody(body)),
    ));
  });

  it("GET /api/recipes/random", () => app
    .request("GET", "/api/recipes/random")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      res.body.should.have.property("_id");
      res.body.should.have.property("state", recipeStateEnum.published);
    }));
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
