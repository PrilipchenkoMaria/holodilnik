const { MongoClient } = require("mongodb");
require("dotenv").config();

module.exports = {
  connect,
  collection,
  close,
};

let client;
let db;

async function connect() {
  const { DB_URL, DB_NAME } = process.env;
  if (client) return;
  client = await MongoClient.connect(DB_URL, { useUnifiedTopology: true });
  db = client.db(DB_NAME);
}

function collection(collectionName) {
  if (!client) throw new Error("Client does not exist");
  return db.collection(collectionName);
}

async function close() {
  if (client) await client.close();
  client = null;
  db = null;
}
