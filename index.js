const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// enable cookies
app.use(
  cookieSession({
    // conversion for cookie lasting 30 days before it expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// call authRoutes with the app object
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
