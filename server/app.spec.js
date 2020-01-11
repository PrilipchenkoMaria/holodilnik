const app = require("./app.test");


const jsonServer = require("json-server");
const router = jsonServer.router("db.json");
const serve = jsonServer.create();
serve.set("db", router.db);
const db = serve.get("db");

describe("Api", () => {
    [
        "/api/recipes",
        "/api/recipes/random",
    ].forEach((action) =>
        it(`GET ${action}`, () => app
            .request("GET", action)
            .expect(200)
            .expect("Content-Type", /json/)));

});

describe("Security", () => {
    describe("Restricted routes", () => {
        it(`GET "/api/users", restricted`, () => app
            .request("GET", "/api/users")
            .expect(401)
            .expect("Content-Type", /json/)
            .then(res => res.body.should.eql({
                message: "Not authenticated",
                status: 401,
            })));
        it(`GET "/api/users", valid`, () => app
            .request("GET", "/api/users")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoyMDc3MzA3OTgzLCJleHAiOjIwNzczOTMzMzJ9.0mZl0qwjduaZdjNkFBiV6wAlHZz67VZwJCIFgkvQqAQ")
            .expect(200)
            .expect("Content-Type", /json/));
    });
    describe(`"POST /api/auth/signup"`, () => {
        [
            [
                "valid creds",
                {login: "test", email: "test@holodilnik.com", password: "test"},
                201, body => {
                body.should.have.property("token");
                body.should.have.property("userId");
            },
            ],
            [
                "same email",
                {login: "test", email: "test@holodilnik.com", password: "testtest"},
                200, body => body.should.eql({message: "This email already taken"}),
            ],
            [
                "no creds",
                {email: "largo@holodilnik.com"},
                400, body => body.should.eql({message: "Invalid payload"}),
            ],

        ].forEach(([caseName, payload, expectCode, assertResponseBody]) =>
            it(caseName, () => app
                .request("POST", "/api/auth/signup")
                .send(payload)
                .expect(expectCode)
                .expect("Content-Type", /json/)
                .then((res) => assertResponseBody(res.body)
                )))
        after(function() {
            db.get('users')
                .remove({ email: 'test@holodilnik.com!' })
                .write()
        });
    });
    describe("POST /api/auth/signin", () => {
        [
            [
                "invalid creds",
                {email: "123", password: "123"},
                403, body => body.should.eql({message: "Incorrect email or password"}),
            ],
            [
                "invalid password",
                {email: "largo@holodilnik.com", password: "12345"},
                403, body => body.should.eql({message: "Incorrect email or password"}),
            ],
            [
                "valid creds",
                {email: "largo@holodilnik.com", password: "123"},
                200, body => {
                body.should.have.property("token");
                body.should.have.property("userId");
            },
            ],
            [
                "no creds",
                {email: "largo@holodilnik.com"},
                400, body => body.should.eql({message: "Invalid payload"}),
            ],
        ].forEach(([caseName, payload, expectCode, assertResponseBody]) =>
            it(caseName, () => app
                .request("POST", "/api/auth/signin")
                .send(payload)
                .expect(expectCode)
                .expect("Content-Type", /json/)
                .then(res => assertResponseBody(res.body))));
    });

});
