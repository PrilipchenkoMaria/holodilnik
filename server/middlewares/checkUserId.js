const { getUserIdByToken } = require("../services/signIn");

async function checkUserId(req, res, next) {
  const authString = req.headers.authorization;
  const userId = await getUserIdByToken(authString);
  if (!userId) {
    return res.status(401).json({
      message: "Not authenticated",
      status: 401,
    });
  }
  return next();
}

module.exports = checkUserId;
