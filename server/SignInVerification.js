const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {secret} = require("../config");
const MongoClient = require("mongodb").MongoClient;
const {testUsersDBConfig} = require("../config");


module.exports = {
    getUserIdByCreds,
    signToken,
    getUserIdByToken,
};


async function getUserIdByCreds(email, password) {
    const client = await new MongoClient.connect(testUsersDBConfig.mongo.url, {useUnifiedTopology: true});
    const collection = client.db(testUsersDBConfig.mongo.dbname).collection("users");
    const user = await collection.findOne({email: email});
    if (!user) return false;
    const isPassCorrect = await checkPass(password, user.password);
    await client.close();
    return isPassCorrect ? user._id : false;
}


async function signToken(id) {
    return jwt.sign({id}, secret, {expiresIn: "24h"});
}

async function getUserIdByToken(token) {
    const verifyToken = jwt.verify(token, secret, function (err, decoded) {
        return decoded;
    });
    return (verifyToken !== undefined ? verifyToken.id : false);
}

async function checkPass(password, hash) {
    return bcrypt.compare(password, hash);
}

