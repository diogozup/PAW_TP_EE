const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  NIF:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);