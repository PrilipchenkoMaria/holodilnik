const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const {random} = require("lodash");


app.use(jsonServer.defaults());
app.use(jsonServer.rewriter({
    "/api/*": "/$1",
    "/api/recipes/:id": "/api/recipes/:recipeId",
}));
app.get("/recipes/random", (req, res) => {
    const {db} = router;
    const length = db.get("recipes.length").value();
    const ran = random(length - 1);
    res.json(db.get(`recipes.${ran}`).value());
});

app.use(router);

app.run = () => app.listen(3001, () => {
    console.log("JSON Server is running");
});

module.exports = app;
