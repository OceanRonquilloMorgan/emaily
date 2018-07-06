// Mongoose model class
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// alternative declaration: const { Schema } = mongoose;

// user consists of their ID and number of credits
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
