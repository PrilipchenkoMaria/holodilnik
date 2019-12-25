const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const {getUserIdByCreds} = require("./SignInVerification");
const {signToken} = require("./SignInVerification");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const {random} = require("lodash");


app.set("db", router.db);

app.use(jsonServer.defaults());
app.use(jsonServer.rewriter({
    "/api/*": "/$1",
    "/api/recipes/:id": "/api/recipes/:recipeId",
}));
app.use(bodyParser.json());
app.get("/recipes/random", (req, res) => {
    const db = app.get("db");
    const length = db.get("recipes.length").value();
    const ran = random(length - 1);
    res.json(db.get(`recipes.${ran}`).value());
});
app.use("/users", isAuthenticated);

function isAuthenticated(req, res, next) {
    const isAuthenticated = false; // todo: verify authentication from token

    if (!isAuthenticated) {
        return res.status(401).json({
            message: "Not authenticated",
            status: 401,
        });
    }

    next();
}

app.post("/auth/signin", (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Invalid payload",
        });
    }

    const userId = getUserIdByCreds(app.get("db"), email, password);

    if (!userId) {
        return res.status(403).json({
            message: "Incorrect username or password",
        });
    }

    res.status(200).json({
        message: "Authentication successful!",
        token: signToken(userId),
    });
});

app.use(router);

app.run = () => app.listen(3001, () => {
    console.log("JSON Server is running");
});

module.exports = app;
