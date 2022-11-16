const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
  clinicId: {type: String, required: true},
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+(.-?\w+)@\w+(.-?\w+)(.\w{2,3})+$/
  },
  token: {type: String}
});

module.exports = mongoose.model('dentist', dentistSchema);
