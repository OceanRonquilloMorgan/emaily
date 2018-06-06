const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// route POST-request handler to update user's number of credis
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // create a charge object
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    // add credits to user models
    req.user.credits += 5;
    // async user request to update user
    const user = await req.user.save();

    res.send(user);
  });
};
