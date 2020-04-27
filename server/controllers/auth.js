const router = require("express").Router();

const { checkUserEmail } = require("../services/signUp");
const { getUserIdByCreds } = require("../services/signIn");
const { newToken } = require("../services/signIn");
const { getNewUserId } = require("../services/signUp");

router.post("/signup", signUp);
router.post("/signin", signIn);

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

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }
  const db = req.app.get("mongoDB");
  const userId = await getUserIdByCreds(db, email, password);
  if (!userId) {
    return res.status(403).json({
      message: "Incorrect email or password",
    });
  }
  const token = await newToken(userId);
  return res.status(200).json({
    message: "Authentication successful!",
    token,
  });
}

module.exports = router;
