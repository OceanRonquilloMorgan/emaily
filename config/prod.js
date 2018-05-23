// prod.js - production keys here
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SERET,
  mongoURI: process.env.MONGO_URI,
  // made this up; something someone can't guess
  cookieKey: process.env.COOKIE_KEY
};
