const router = require("express").Router();
const { newToken, hashPass, decodeToken } = require("../../services/security");
const { sendEmail } = require("../../services/email");
const { checkUserEmail } = require("../../services/auth");

router.post("/request", initiatePasswordReset);
router.put("/confirm", resetPassword);

async function initiatePasswordReset(req, res) {
  const { email } = req.body;
  const db = req.app.get("mongoDB");
  const user = await checkUserEmail(db, email);

  if (!email || !user) {
    res.status(400).json({
      message: "Invalid payload",
    });
  }
  const token = await newToken(user._id);
  const resetURL = `${req.headers.origin}/reset-password/${token}`;

  sendEmail({
    email,
    subject: "Смена пароля holodilnik.ua",
    body: "<div>"
      + "<p>Чтобы сменить парроль перейдите по ссылке ниже</p>"
      + `<a href='${resetURL}'>${resetURL}</a>`
      + "</div>",
  });

  return res.status(200).json({
    message: "Confirmation email was sent",
  });
}

async function resetPassword(req, res) {
  const { token, password } = req.body;
  const email = await decodeToken(token);
  const db = req.app.get("mongoDB");
  const user = await checkUserEmail(db, email);

  if (!email || !user || !password) {
    res.status(400).json({
      message: "Invalid payload",
    });
  }

  const hashedPassword = await hashPass(password);
  db.collection("users").updateOne(
    { _id: user._id },
    { $set: { password: hashedPassword } },
  );

  return res.status(201).json({
    message: "Password reset successful",
  });
}

module.exports = router;
