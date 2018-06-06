module.exports = (req, res, next) => {
  // require authentication for charges / adding credits
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  // continue onto next middleware on chain
  next();
};
