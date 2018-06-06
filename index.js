const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// express middleware; parse payload
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// parser middleware for incoming request object
app.use(bodyParser.json());

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

// call our routes with the app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// routing in production / prod environment for heroku
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
