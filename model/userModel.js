const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide your name']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email']
    },
    role: {
      type: String,
      enum: ['customer', 'collection', 'admin'],
      default: 'customer'
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minlength: 8
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;