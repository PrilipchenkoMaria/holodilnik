const router = require("express").Router();
const passport = require("passport");

const { checkUserEmail } = require("../../services/auth");
const { newToken } = require("../../services/security");
const { getNewUserId } = require("../../services/auth");
require("./passport/strategies");

router.use(passport.initialize());
router.post("/signup", signUp);
router.use("/reset-password", require("./reset-password"));
router.use("/signin", require("./passport/auth"));

async function signUp(req, res) {
  const { login, email, password } = req.body;

  if (!login || !email || !password) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }
  const db = req.app.get("mongoDB");
  const user = await checkUserEmail(db, email);
  if (user) {
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
