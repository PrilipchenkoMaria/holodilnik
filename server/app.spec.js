const { after } = require("mocha");
const app = require("./app.test");
const DataBase = require("./DataBase");

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
    .send({
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
    })
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.be.an("array")));
});

describe("Single recipe", () => {
  it("POST /api/recipes", () => app
    .request("POST", "/api/recipes")
    .send({
      dishName: "test",
      portionsNumber: 2,
      shortDescription: "test",
      cookingTime: "test",
      ingredients: [
        {
          name: "test",
          weight: 500,
          measure: "g",
        },
        {
          name: "test",
          weight: 2,
          measure: "piece",
        },
      ],
      description: "test",
    })
    .expect(201)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.have.property("id")));
  after(async () => {
    await DataBase.connect();
    await DataBase.collection("recipes").removeOne({ dishName: "test" });
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
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
        + "eyJpZCI6IjVlODM4MjVmYzExZmExMDA3YjViZTNjZSIsImlhdCI6MjUxNjIzOTAyMn0."
        + "ZfahVjpha2c42kaV2kfSqI9vozl4e4rV4YsNNk3oZvc")
      .expect(200)
      .expect("Content-Type", /json/));
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
      await DataBase.connect();
      await DataBase.collection("users").removeOne({ email: "test@holodilnik.com" });
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
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      + ".eyJpZCI6IjVlODM4MjVmYzExZmExMDA3YjViZTNjZSIsImlhdCI6MjUxNjIzOTAyMn0"
      + ".ZfahVjpha2c42kaV2kfSqI9vozl4e4rV4YsNNk3oZvc")
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
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      + ".eyJpZCI6IjVlODM4MjVmYzExZmExMDA3YjViZTNjZSIsImlhdCI6MjUxNjIzOTAyMn0"
      + ".ZfahVjpha2c42kaV2kfSqI9vozl4e4rV4YsNNk3oZvc")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => res.body.should.be.an("array")));
});
after(async () => {
  await DataBase.close();
});
