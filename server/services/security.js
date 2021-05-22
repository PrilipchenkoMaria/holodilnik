const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { SECRET } = process.env;
module.exports = {
  newToken,
  temporaryToken,
  getUserIdByToken,
  decodeToken,
  checkPass,
  hashPass,
};

async function newToken(id) {
  return jwt.sign({ id }, SECRET, { expiresIn: "24h" });
}

async function temporaryToken(id) {
  return jwt.sign({ id }, SECRET, { expiresIn: "5m" });
}

async function getUserIdByToken(authString) {
  const token = authString && authString.substring(7);
  return decodeToken(token);
}

async function decodeToken(token) {
  const verifyToken = jwt.verify(token, SECRET, (err, decoded) => decoded);
  return (verifyToken !== undefined ? verifyToken.id : false);
}

async function checkPass(password, hash) {
  return bcrypt.compare(password, hash);
}

async function hashPass(password) {
  return bcrypt.hash(password, 10);
}
