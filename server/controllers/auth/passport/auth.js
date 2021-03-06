const passport = require("passport");
const router = require("express").Router();
const { temporaryToken, newToken, getUserIdByToken } = require("../../../services/security");

router.post("/", authLocal, response);
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), postOAuthCallback);
router.get("/google", passport.authenticate("google", { scope: "profile" }));
router.get("/google/callback", passport.authenticate("google", { session: false }), postOAuthCallback);
router.get("/vk", passport.authenticate("vkontakte", { display: "popup" }));
router.get("/vk/callback", passport.authenticate("vkontakte", { session: false }), postOAuthCallback);
router.get("/refresh-token", refreshToken);

async function postOAuthCallback(req, res) {
  const token = await temporaryToken(req.user.id);
  res.redirect(`/OAuth/${token}`);
}

function authLocal(req, res, next) {
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

async function refreshToken(req, res) {
  const authString = req.headers.authorization;
  if (!authString) return res.status(400).json({});
  const userId = await getUserIdByToken(authString);
  if (!userId) return res.status(401).json({});
  return res.status(200).json({
    token: await newToken(userId),
  });
}

module.exports = router;
