const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secret } = require("../config");

module.exports = {
  getUserIdByCreds,
  signToken,
  getUserIdByToken,
};

async function getUserIdByCreds(db, email, password) {
  const user = await db.collection("users").findOne({ email });
  if (!user) return false;
  const isPassCorrect = await checkPass(password, user.password);
  return isPassCorrect ? user._id : false;
}

async function signToken(id) {
  return jwt.sign({ id }, secret, { expiresIn: "24h" });
}

async function getUserIdByToken(authString) {
  const token = authString && authString.substring(7);
  return decodeToken(token);
}

async function decodeToken(token) {
  const verifyToken = jwt.verify(token, secret, (err, decoded) => decoded);
  return (verifyToken !== undefined ? verifyToken.id : false);
}

async function checkPass(password, hash) {
  return bcrypt.compare(password, hash);
}
