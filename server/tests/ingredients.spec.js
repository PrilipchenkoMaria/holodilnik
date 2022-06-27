const { before } = require("mocha");
require("dotenv").config();
const app = require("./app.test");
const { newToken } = require("../services/security");

let testRecipeId;
before(async () => {
  const { TEST_USER_ID } = process.env;
  token = await newToken(TEST_USER_ID);
  testRecipeId = process.env.PUBLISHED_RECIPE_ID;
});

describe("ingredients", () => {
  it("GET /api/ingredients", () => app
    .request("GET", "/api/ingredients")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.be.an("array")));
  it("anonymous PUT /api/user/ingredients", () => app
    .request("PUT", "/api/user/ingredients")
    .send({
      userId: null,
      ingredients: [],
    })
    .expect(401)
    .expect("Content-Type", /json/));
  it("user PUT /api/user/ingredients", () => app
    .request("PUT", "/api/user/ingredients")
    .set("Authorization", `Bearer ${token}`)
    .send({
      ingredients: [{
        name: "Творог",
        weight: 500,
      }, {
        name: "Сахар",
        weight: 5,
      }],
    })
    .expect(200)
    .expect("Content-Type", /json/));
  it("GET /api/user/ingredients", () => app
    .request("GET", "/api/user/ingredients")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.be.an("array")));

  describe("POST /api/user/recipe/prepare", () => {
    const initialIngredients = [{
      name: "Пшеничная мука",
      weight: 500,
    },
    {
      name: "Куриная печень",
      weight: 5,
    },
    {
      name: "Сахар",
      weight: 5,
    }];
    const expectedIngredients = [{
      name: "Пшеничная мука",
      weight: 100,
    },
    {
      name: "Куриная печень",
      weight: 5,
    }];

    it("without user", async () => {
      await app
        .request("PUT", "/api/user/recipe/prepare")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ingredients: initialIngredients,
          recipeId: testRecipeId,
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => res.body.ingredients.should.deep.to.equal(expectedIngredients));
    });
    it("authorized", async () => {
      await app
        .request("PUT", "/api/user/recipe/prepare")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ingredients: initialIngredients,
          recipeId: testRecipeId,
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => res.body.ingredients.should.deep.to.equal(expectedIngredients));
      // check if user ingredients are saved
      await app
        .request("GET", "/api/user/ingredients")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => res.body.should.deep.to.equal(expectedIngredients));
    });
  });
});

let token;
