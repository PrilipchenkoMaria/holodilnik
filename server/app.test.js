process.env.NODE_ENV = "test";
require("chai").should();

const app = require("./app");
const supertest = require("supertest");

module.exports = {
    request,
};

function request(method, action, auth = true) {
    method = method.toLowerCase();

    return supertest(app)[method](action);
}
