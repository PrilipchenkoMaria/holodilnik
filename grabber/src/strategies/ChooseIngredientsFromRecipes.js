const MongoClient = require("mongodb").MongoClient;
const {dbGrabConfig, testUsersDBConfig} = require("../../../config");


main().catch(console.error);

async function main() {
    const ingredientsAndSpices = await separateIngredientsAndSpices();
    await insertSet(ingredientsAndSpices.ingredients, "ingredients");
    await insertSet(ingredientsAndSpices.spices, "spices");
}

async function separateIngredientsAndSpices() {
    const client = await new MongoClient.connect(dbGrabConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(dbGrabConfig.mongo.dbname).collection("eda.ru");
    const recipesIngredients = await collection.find({}, {projection: {_id: 0, recipeIngredient: 1}}).toArray();

    let ingredients = recipesIngredients.map((recipe) => {
        return recipe.recipeIngredient;
    });

    let names = new Set;
    let spices = new Set;
    ingredients.forEach((ingredient) => {
        ingredient.forEach((item) => {
            let num = new RegExp(/\s\d+\s|\s\d+\/|\s\d+,/);
            let preposition = new RegExp(/\sпо\s|\sна\s|\sщепотка\s/);
            let parenthesis = new RegExp(/\(/);
            let byTastePreposition = new RegExp(/\sпо\s/);

            if (byTastePreposition.exec(item)) spices.add(item.split(byTastePreposition, 1).join());
            if (num.exec(item)) item = item.split(num, 1).join();
            if (preposition.exec(item)) item = item.split(preposition, 1).join();
            if (parenthesis.exec(item)) item = item.split(parenthesis, 1).join();
            names.add(item);
        });
    });
    await client.close();
    return ({ingredients: names, spices: spices});
}

async function insertSet(set, collectionName) {
    const client = await new MongoClient.connect(testUsersDBConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(testUsersDBConfig.mongo.dbname).collection(collectionName);
    await collection.insertOne({ingredients:Array.from(set)});
    await client.close();
}
