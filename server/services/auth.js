const { hashPass, checkPass } = require("./security");

module.exports = {
  getNewUserId,
  getNewOAuthUserId,
  checkUserEmail,
  checkUserByProviderID,
  getUserIdByCreds,
};

async function checkUserEmail(db, email) {
  return db.collection("users").findOne({ email });
}

async function checkUserByProviderID(db, provider, id) {
  return db.collection("users").findOne({ [provider]: id });
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

async function getNewOAuthUserId(db, data) {
  const user = await db.collection("users").insertOne(data);
  return user.insertedId;
}

async function getUserIdByCreds(db, email, password) {
  const user = await db.collection("users").findOne({ email });
  if (!user) return false;
  const isPassCorrect = await checkPass(password, user.password);
  return isPassCorrect ? user._id : false;
}
