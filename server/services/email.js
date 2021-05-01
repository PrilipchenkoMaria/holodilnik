const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = { sendEmail };

async function sendEmail({ email, subject, body }) {
  const {
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_ACCOUNT,
    EMAIL_PASSWORD,
  } = process.env;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: EMAIL_PORT,
    secure: EMAIL_SECURE,
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Holodilnik",
    to: email,
    subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
  }
}
