const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const {isTokenValid} = require("./SignInVerification");
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

async function isAuthenticated(req, res, next) {
    const {authorization} = req.headers;
    const token = authorization && authorization.substring(7);
    const isAuthenticated = await isTokenValid(token);

    if (!isAuthenticated) {
        return res.status(401).json({
            message: "Not authenticated",
            status: 401,
        });
    }
    next();
}

app.post("/auth/signin", signInResponse);

async function signInResponse(req, res) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Invalid payload",
            });
        }

        const userId = await getUserIdByCreds(app.get("db"), email, password);

        if (!userId) {
            return res.status(403).json({
                message: "Incorrect email or password",
            });
        }
        const token = await signToken(userId);
        res.status(200).json({
            message: "Authentication successful!",
            token: token,
            userId: userId,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `${err}`,
        });
    }
}

app.use(router);

app.run = () => app.listen(3001, () => {
    console.info("JSON Server is running");
});

module.exports = app;
