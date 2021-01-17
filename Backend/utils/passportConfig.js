const GoogleStrategy = require("passport-google-oauth20").Strategy;
const users = require("../models/user");

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/user/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
         cb(null, profile);
      },
    ));
}
