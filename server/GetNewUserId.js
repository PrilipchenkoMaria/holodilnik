const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const MongoClient = require("mongodb").MongoClient;
const {testUsersDBConfig} = require("../config");


module.exports = {
    getNewUserId,
    checkUserEmail,
};

async function checkUserEmail(email) {
    const client = await new MongoClient.connect(testUsersDBConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(testUsersDBConfig.mongo.dbname).collection("users");
    const user = await collection.findOne({email: email});
    await client.close();
    return user;
}

async function getNewUserId(login, email, password) {
    const hashPassword = await hashPass(password);

    const client = await new MongoClient.connect(testUsersDBConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(testUsersDBConfig.mongo.dbname).collection("users");

    let user = await collection.insertOne({
        username: login,
        email: email,
        password: hashPassword,
    });
    await client.close();
    return user.insertedId;
}

async function hashPass(password) {
    return bcrypt.hash(password, 10);
}
