const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model("landingpages", dentistSchema);
