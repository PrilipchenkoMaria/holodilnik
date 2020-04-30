const bcrypt = require("bcryptjs");

module.exports = {
  getNewUserId,
  checkUserEmail,
};

async function checkUserEmail(db, email) {
  return db.collection("users").findOne({ email });
}

async function getNewUserId(db, login, email, password) {
  const hashPassword = await hashPass(password);
  const user = await db.collection("users").insertOne({
    username: login,
    email,
    password: hashPassword,
    ingredients: [],
  });
  return user.insertedId;
}

async function hashPass(password) {
  return bcrypt.hash(password, 10);
}