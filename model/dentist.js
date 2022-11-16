const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
    clinicId: {type: String},
    name: {type: String},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    token: {type: String}
});

module.exports = mongoose.model("landingpages", dentistSchema);
