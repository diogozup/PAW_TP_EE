const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


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
    required: true,
    unique: true
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
//   },
//   createdAt:{
//     type: date,
//     default: date.now
//   }
});

//ainda tenho que utilizar o error handler para isto dar
//schema.plugin(mongooseUniqueValidator);

const User = module.exports = mongoose.model('User', UserSchema);