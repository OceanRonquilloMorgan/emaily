const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// encoding users
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// function to turn user id into a user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// configuring passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists; returns a promise
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }
      // else, we don't have a user record with this ID, make a new user
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
