const app = require("./app.test");

describe("App", () => {
    [
        "/db",
        "/api/recipes",
        "/api/recipes/random",
        "/api/users",
    ].forEach((action) =>
        it(`GET ${action}`, () => app
            .request("GET", action)
            .expect(200)
            .expect("Content-Type", /json/)));
});
