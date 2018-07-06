const _ = require('lodash');
const Path = require('path-parser').default;
// default integrated node module to help parse URLs
const { URL } = require('url');
// side-step issue with tests by requiring in mongoose
const mongoose = require('mongoose');
// require the login middleware
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  // fetch and display survey campaigns created by current user
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // reach into surveys collection in MongoDB
    const surveys = await Survey.find({ _user: req.user.id })
      // select certain properties so entire recipients not returned
      .select({ recipients: false });

    res.send(surveys);
  });

  // redirect user to a thank-you page after submitting survey answer
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  // testing webhooks
  app.post('/api/surveys/webhooks', (req, res) => {
    // create parser object and pass in extraction of route + surveyId / choice
    const p = new Path('/api/surveys/:surveyId/:choice');

    // lodash chain helper refactor to process events
    _.chain(req.body)
      // use lodash to iterate over request events
      .map(({ email, url }) => {
        // either an object or null (if unable to extract above)
        const match = p.test(new URL(url).pathname);

        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })

      // removes undefined elements; return only event objects
      .compact()
      // remove duplicate records
      .uniqBy('email', 'surveyId')
      // run our query
      .each(({ surveyId, email, choice }) => {
        // executing query; updated in mongoose
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          // update criteria object
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  // make sure user is logged in & ensure they have enough credits
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // request handler logic
    const { title, subject, body, recipients } = req.body;

    // create new instance of survey
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    // error-handling
    try {
      await mailer.send();
      await survey.save();
      // deduct credits
      req.user.credits -= 1;
      const user = await req.user.save();

      // sendback updated user model
      res.send(user);
    } catch (err) {
      // unprocessable survey
      res.status(422).send(err);
    }
  });
};
