// Mailer setup using Sendgrid's API
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
// import API key
const keys = require('../config/keys');

// provide additional customization
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);

    // assign properties
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // Mail class has a function called addContent
    this.addContent(this.body);
    // enable click tracking
    this.addClickTracking();
    this.addRecipients();
  }

  // helper functions

  // return array of emails for subdoc collection
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // enable click tracking
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  // utilize more SendGrid Mailer class properties
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  // use SendGrid API to send request
  async send() {
    // create request
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    // send off request
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
