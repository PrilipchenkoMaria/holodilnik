const { getUserIdByToken } = require("../services/security");

async function checkUserId(req, res, next) {
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authenticated",
      status: 401,
    });
  }
  return next();
}

async function getUserId(req, res, next) {
  const authString = req.headers.authorization;
  req.userId = await getUserIdByToken(authString);
  return next();
}

module.exports = {
  checkUserId,
  getUserId,
};
