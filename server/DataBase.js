const MongoClient = require("mongodb").MongoClient;
const {testUsersDBConfig} = require("../config");

module.exports = {
    connect,
    collection,
    close,
};

let client;
let db;

async function connect() {
    if (client) return;
    client = await new MongoClient.connect(testUsersDBConfig.mongo.url, {useUnifiedTopology: true});
    db = client.db(testUsersDBConfig.mongo.dbname);
}

function collection(collectionName) {
    if (!client) throw new Error("Client does not exist");
    return db.collection(collectionName);
}

async function close() {
    await client.close();
    client = null;
    db = null;
}
