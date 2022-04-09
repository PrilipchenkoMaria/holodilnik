const { after, before } = require("mocha");
require("dotenv").config();
const app = require("./app.test");
const dataBase = require("../services/dataBase");
const { newToken } = require("../services/security");

before(async () => {
  const { TEST_USER_ID } = process.env;
  token = await newToken(TEST_USER_ID);
  emailToken = await newToken("largo@holodilnik.com");
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
    .send(recipe)
    .expect(201)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.have.property("id")));
  after(async () => {
    await dataBase.connect();
    await dataBase.collection("recipes").removeOne({ dishName: "test" });
  });
  [
    "/api/recipes/5e769d933890ec07187063f0",
    "/api/recipes/random",
  ].forEach((action) => it(`GET ${action}`, () => app
    .request("GET", action)
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.have.property("_id"))));
});

describe("Security", () => {
  describe("Restricted routes", () => {
    it("GET /api/user/auth, no token", () => app
      .request("GET", "/api/user/auth")
      .expect(401)
      .expect("Content-Type", /json/)
      .then((res) => res.body.should.eql({
        message: "Not authenticated",
        status: 401,
      })));
    it("GET /api/user/auth, valid", () => app
      .request("GET", "/api/user/auth")
      .set("Authorization", `Bearer ${token}`)
      .expect(200));
  });
  describe("POST /api/auth/signup", () => {
    [
      [
        "valid creds",
        { login: "test", email: "test@holodilnik.com", password: "test" },
        201, (body) => {
          body.should.have.property("token");
        },
      ],
      [
        "same email",
        { login: "test", email: "largo@holodilnik.com", password: "testtest" },
        200, (body) => body.should.eql({ message: "This email already taken" }),
      ],
      [
        "no creds",
        { email: "largo@holodilnik.com" },
        400, (body) => body.should.eql({ message: "Invalid payload" }),
      ],

    ].forEach(([caseName, payload, expectCode, assertResponseBody]) => it(caseName, () => app
      .request("POST", "/api/auth/signup")
      .send(payload)
      .expect(expectCode)
      .expect("Content-Type", /json/)
      .then((res) => assertResponseBody(res.body))));
    after(async () => {
      await dataBase.connect();
      await dataBase.collection("users").removeOne({ email: "test@holodilnik.com" });
    });
  });
  describe("POST /api/auth/signin", () => {
    [
      [
        "invalid creds",
        { email: "123", password: "123" },
        403, (body) => body.should.eql({ message: "Incorrect email or password" }),
      ],
      [
        "invalid password",
        { email: "largo@holodilnik.com", password: "12345" },
        403, (body) => body.should.eql({ message: "Incorrect email or password" }),
      ],
      [
        "valid creds",
        { email: "largo@holodilnik.com", password: "123" },
        200, (body) => {
          body.should.have.property("token");
        },
      ],
      [
        "no creds",
        { email: "largo@holodilnik.com" },
        400, (body) => body.should.eql({ message: "Invalid payload" }),
      ],
    ].forEach(([caseName, payload, expectCode, assertResponseBody]) => it(caseName, () => app
      .request("POST", "/api/auth/signin")
      .send(payload)
      .expect(expectCode)
      .expect("Content-Type", /json/)
      .then((res) => assertResponseBody(res.body))));
  });
  describe("GET /api/auth/signin/refresh-token", () => {
    it("no token", () => app
      .request("GET", "/api/auth/signin/refresh-token")
      .expect(400)
      .expect("Content-Type", /json/));
    it("valid", () => app
      .request("GET", "/api/auth/signin/refresh-token")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => res.body.should.have.property("token")));
    it("invalid", () => app
      .request("GET", "/api/auth/signin/refresh-token")
      .set("Authorization", "Bearer test")
      .expect(401));
  });
  describe("POST /api/auth/reset-password/request", () => {
    it("no email", () => app
      .request("POST", "/api/auth/reset-password/request")
      .expect(400)
      .then((res) => res.body.should.eql({ message: "Invalid payload" })));
    it("valid", () => app
      .request("POST", "/api/auth/reset-password/request")
      .send({ email: "largo@holodilnik.com" })
      .expect(200)
      .then((res) => res.body.should.eql({ message: "Confirmation email was sent" })));
    it("invalid", () => app
      .request("POST", "/api/auth/reset-password/request")
      .send({ email: "123" })
      .expect(400)
      .then((res) => res.body.should.eql({ message: "Invalid payload" })));
  });
  describe("POST /api/auth/reset-password/confirm", () => {
    it("no token", () => app
      .request("PUT", "/api/auth/reset-password/confirm")
      .expect(400)
      .then((res) => res.body.should.eql({ message: "Invalid payload" })));
    it("valid", () => app
      .request("PUT", "/api/auth/reset-password/confirm")
      .send({ token: emailToken, password: "123" })
      .expect(201)
      .then((res) => res.body.should.eql({ message: "Password reset successful" })));
    it("invalid", () => app
      .request("PUT", "/api/auth/reset-password/confirm")
      .send({ token: "test", password: "test" })
      .expect(400)
      .then((res) => res.body.should.eql({ message: "Invalid payload" })));
  });
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
    const recipeId = "5e769d933890ec07187063f0";
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
          recipeId,
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
          recipeId,
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

after(async () => {
  await dataBase.close();
});

let token;
let emailToken;
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
