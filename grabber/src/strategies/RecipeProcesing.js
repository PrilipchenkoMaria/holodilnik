const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
const https = require('https');
const path = require('path');
const {dbGrabConfig, testUsersDBConfig} = require("../../../config");

main().catch(console.error);

async function main() {
    await reformRecipe();
    await recipesValidation();
    await ingredientsValidation();
    await findIngredientsNames();
    await saveImages();
}

async function reformRecipe() {
    const recipes = await getDBCollectionArr(dbGrabConfig, "eda.ru", {});

    for (const recipe of recipes) {
        const reformedIngredients = await reformIngredients(recipe.recipeIngredient);
        const reformedRecipe = {
            dishName: recipe.name,
            portionsNumber: recipe.recipeYield,
            shortDescription: recipe.description,
            cookingTime: recipe.totalTime,
            ingredients: reformedIngredients.ingredientsArr,
            optionalIngredients: reformedIngredients.spicesArr,
            description: recipe.recipeInstructions,
            imageUrl: recipe.image,
        };
        await dbInsertOne(testUsersDBConfig, "recipes", reformedRecipe);
    }
}

async function reformIngredients(ingredients) {
    const ingredientsArr = [];
    const spicesArr = [];

    ingredients.forEach((ingredient) => {
        const num = new RegExp(/\s\d+\s|\s\d+[,/]\d+\s/);
        const preposition = new RegExp(/\s(на|щепотка).*/);
        const parenthesis = new RegExp(/\s\(|\(/);
        const byTastePreposition = new RegExp(/\sпо\s/);

        let reformedIngredient = {};

        if (num.test(ingredient)) {
            const nameMeasure = ingredient.split(num);
            if (parenthesis.test(ingredient)) {
                reformedIngredient.name = ingredient.split(parenthesis, 1).join();
            } else reformedIngredient.name = nameMeasure[0];
            if (ingredient.match(/\d+[,/]\d+/)) reformedIngredient.weight = ingredient.match(/\d+[,/]\d+/)[0];
            else reformedIngredient.weight = parseInt(ingredient.match(num)[0]);
            reformedIngredient.measure = nameMeasure[1];
            ingredientsArr.push(reformedIngredient);
        }
        if (preposition.test(ingredient)) {
            reformedIngredient.name = ingredient.split(preposition, 1).join();
            reformedIngredient.weight = 0;
            reformedIngredient.measure = ingredient.match(preposition)[0];
            ingredientsArr.push(reformedIngredient);
        }
        if (byTastePreposition.test(ingredient)) {
            if (parenthesis.test(ingredient)) {
                ingredient = ingredient.split(parenthesis, 1).join();
            } else ingredient = ingredient.split(byTastePreposition, 1).join();
            spicesArr.push(ingredient);
        }
    });
    return ({ingredientsArr, spicesArr});
}

async function recipesValidation() {
    const recipes = await getDBCollectionArr(testUsersDBConfig, "recipes", {});

    for (const recipe of recipes) {
        if (recipe.shortDescription === recipe.dishName) {
            await dbDeleteOne(
                testUsersDBConfig,
                "recipes",
                {shortDescription: recipe.shortDescription},
            );
        }
    }
}

async function ingredientsValidation() {
    const ingredientsArr = await dbFindOne(testUsersDBConfig, "ingredientsEda", {});
    let singleRecipes = [];
    for (const ingredient of ingredientsArr.ingredients) {
        const recipes = await getDBCollectionArr(
            testUsersDBConfig,
            "recipes",
            {ingredients: {$elemMatch: {name: ingredient}}});
        if (recipes.length === 1) {
            singleRecipes.push(ingredient);
            await dbDeleteOne(testUsersDBConfig,
                "recipes",
                {ingredients: {$elemMatch: {name: ingredient}}},
            );
        }
    }
}

async function findIngredientsNames() {
    const recipes = await getDBCollectionArr(testUsersDBConfig, "recipes");
    let names = new Set ();
    for (const recipe of recipes) {
        recipe.ingredients.forEach((ingredient) => {
            names.add(ingredient.name);
        });
    }
    await dbInsertOne(testUsersDBConfig, "ingredients", {ingredients: Array.from(names)});
}

async function saveImages() {
    const recipes = await getDBCollectionArr(testUsersDBConfig, "recipes");
    for (const recipe of recipes) {
        const url = recipe.imageUrl;
        const localPath = path.resolve(`${__dirname}/../../../public/img/${recipe.dishName}.jpg`);
        await saveFile(url, localPath);
    }
}

async function saveFile(url, localPath) {
    const writeStream = fs.createWriteStream(localPath);

    const request = https.get(url, (res) => {
        console.info('statusCode:', res.statusCode);
        console.info('headers:', res.headers);
        res.pipe(writeStream);
    });

    request.on('error', (e) => {
        console.error(e);
    });
}

async function getDBCollectionArr(dbConfig, collectionName, filter) {
    const client = await new MongoClient.connect(dbConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(dbConfig.mongo.dbname).collection(collectionName);
    const collectionArr = await collection.find(filter).toArray();
    await client.close();
    return collectionArr;
}

async function dbFindOne(dbConfig, collectionName, filter) {
    const client = await new MongoClient.connect(dbConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(dbConfig.mongo.dbname).collection(collectionName);
    const elem = await collection.findOne(filter);
    await client.close();
    return elem;
}

async function dbInsertOne(dbConfig, collectionName, elem) {
    const client = await new MongoClient.connect(dbConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(dbConfig.mongo.dbname).collection(collectionName);
    await collection.insertOne(elem);
    await client.close();
}

async function dbDeleteOne(dbConfig, collectionName, filter) {
    const client = await new MongoClient.connect(dbConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(dbConfig.mongo.dbname).collection(collectionName);
    await collection.deleteOne(filter);
    await client.close();
}
