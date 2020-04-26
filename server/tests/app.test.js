process.env.NODE_ENV = "test";
require("chai").should();

const supertest = require("supertest");
const app = require("../app");

module.exports = {
  request,
};

function request(method, action) {
  const methodToLowerCase = method.toLowerCase();

  return supertest(app)[methodToLowerCase](action);
}
