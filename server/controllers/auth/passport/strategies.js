const passport = require("passport");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const { checkUserByProviderID, getNewOAuthUserId, getUserIdByCreds } = require("../../../services/auth");
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

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  VKONTAKTE_APP_ID,
  VKONTAKTE_APP_SECRET,
  BASE_URL,
} = process.env;


passport.use("facebook", new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${BASE_URL}/api/auth/signin/facebook/callback`,
  profileFields: ["id", "displayName"],
}, (async (accessToken, refreshToken, profile, done) => {
  const user = await checkUserByProviderID(db, "FacebookID", profile.id)
    .catch((err) => done(err));
  if (user) {
    return done(null, { id: user._id });
  }
  const userId = await getNewOAuthUserId(db, {
    username: profile.displayName,
    FacebookID: profile.id,
    ingredients: [],
  })
    .catch((err) => done(err));
  return done(null, { id: userId });
})));

passport.use("google", new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/signin/google/callback`,
}, (async (accessToken, refreshToken, profile, done) => {
  const user = await checkUserByProviderID(db, "GoogleID", profile.id)
    .catch((err) => done(err));
  if (user) {
    return done(null, { id: user._id });
  }
  const userId = await getNewOAuthUserId(db, {
    username: profile.displayName,
    GoogleID: profile.id,
    ingredients: [],
  })
    .catch((err) => done(err));
  return done(null, { id: userId });
})));

passport.use("vkontakte", new VKontakteStrategy({
  clientID: VKONTAKTE_APP_ID,
  clientSecret: VKONTAKTE_APP_SECRET,
  callbackURL: `${BASE_URL}/api/auth/signin/vk/callback`,
  profileFields: ["id", "displayName"],
}, (async (accessToken, refreshToken, profile, done) => {
  const user = await checkUserByProviderID(db, "vkID", profile.id)
    .catch((err) => done(err));
  if (user) {
    return done(null, { id: user._id });
  }
  const userId = await getNewOAuthUserId(db, {
    username: profile.displayName,
    vkID: profile.id,
    ingredients: [],
  })
    .catch((err) => done(err));
  return done(null, { id: userId });
})));
