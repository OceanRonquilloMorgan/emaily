// require in mongoose
const mongoose = require('mongoose');
// get schema object from it
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // subdocument collection; stores email ID & boolean flag for clicked
  recipients: [RecipientSchema],
  // properties for subdocument collection
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
