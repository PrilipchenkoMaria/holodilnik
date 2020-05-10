const router = require("express").Router();
const passport = require("passport");

const { checkUserEmail } = require("../../services/signUp");
const { newToken } = require("../../services/signIn");
const { getNewUserId } = require("../../services/signUp");
const passportAuth = require("./passport/auth");
require("./passport/use");

router.use(passport.initialize());
router.post("/signup", signUp);
router.post("/signin", passportAuth);

async function signUp(req, res) {
  const { login, email, password } = req.body;

  if (!login || !email || !password) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }
  const db = req.app.get("mongoDB");
  const userId = await checkUserEmail(db, email);
  if (userId) {
    return res.status(200).json({
      message: "This email already taken",
    });
  }
  const newUserId = await getNewUserId(db, login, email, password);
  const token = await newToken(newUserId);
  return res.status(201).json({
    message: "User created!",
    token,
  });
}

module.exports = router;
