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

  //handles Cannot GET /auth/google/callback issue
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // router for logging out
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // testing that someone going thru application can access it
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
