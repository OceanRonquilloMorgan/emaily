// mongoose model class
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// alternative declaration: const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
