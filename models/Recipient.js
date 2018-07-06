const mongoose = require('mongoose');
const { Schema } = mongoose;

// for subdocument collection set-up
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
