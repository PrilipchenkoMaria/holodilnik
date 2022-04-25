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

after(async () => {
  dataBase && await dataBase.close();
});

let token;
let emailToken;
