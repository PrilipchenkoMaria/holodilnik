const { after, before } = require("mocha");
const { MongoMemoryServer } = require("mongodb-memory-server");
const dataBase = require("../services/dataBase");

let mongod;

before(async () => {
  mongod = await MongoMemoryServer.create({ dbName: process.env.DB_NAME });
  process.env.DB_URL = mongod.getUri();
});

after(async () => {
  await dataBase.close();
  await mongod.stop();
});
