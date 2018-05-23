// import passport
const passport = require('passport');

module.exports = app => {
  // handling routing (route handlers)
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  // router for logging out
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // testing that someone going thru application can access it
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
