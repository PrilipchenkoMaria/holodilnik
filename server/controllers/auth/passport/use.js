const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserIdByCreds } = require("../../../services/signIn");
const db = require("../../../services/dataBase");

passport.use("local", new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  }, (async (username, password, done) => {
    const userId = await getUserIdByCreds(db, username, password);
    return done(null, { id: userId });
  }),
));
