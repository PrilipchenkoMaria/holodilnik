const passport = require("passport");
const router = require("express").Router();
const { newToken } = require("../../../services/signIn");

router.use("/", auth, response);

function auth(req, res, next) {
  passport.authenticate("local", (err, user) => {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json({ message: "Invalid payload" });
    if (!user.id) res.status(403).json({ message: "Incorrect email or password" });
    req.user = user;
    return next();
  })(req, res, next);
}

async function response(req, res) {
  return res.status(200).json({
    message: "Authentication successful!",
    token: await newToken(req.user.id),
  });
}

module.exports = router;
