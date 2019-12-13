const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");


app.use(jsonServer.defaults());
app.use(jsonServer.rewriter({
    "/api/*": "/$1",
    "/api/recipes/:id": "/api/recipes/:recipeId",
}));

app.use(router);
app.listen(3001, () => {
    console.log("JSON Server is running");
});
