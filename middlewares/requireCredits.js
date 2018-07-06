// middleware to kick user out if they don't have enough credits
// to ensure they don't go to the next routehandler in the chain
module.exports = (req, res, next) => {
  // if they don't have enough credits
  if (req.user.credits < 1) {
    // 403 status code; forbidden
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  // continue onto next middleware on chain
  next();
};
