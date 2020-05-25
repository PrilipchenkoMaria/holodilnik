const passport = require("passport");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { getUserIdByCreds } = require("../../../services/signIn");
const { checkUserByProviderID, getOAuthUserId } = require("../../../services/signUp");
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

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, BASE_URL } = process.env;


passport.use("facebook", new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${BASE_URL}/api/auth/signin/facebook/callback`,
  profileFields: ["id", "displayName"],
}, ((async (accessToken, refreshToken, profile, done) => {
  const user = await checkUserByProviderID(db, "FacebookID", profile.id)
    .catch((err) => done(err));
  if (user) {
    return done(null, { id: user._id });
  }
  const userId = await getOAuthUserId(db, {
    username: profile.displayName,
    FacebookID: profile.id,
    ingredients: [],
  })
    .catch((err) => done(err));
  return done(null, { id: userId });
}))));
