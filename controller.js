const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Dentist = require('./dentist');

//receive credentials

async function login(message) {
    const {email, password} = JSON.parse(message)

    if (!(email && password)) {
        return 0
    }

    const dentist = await Dentist.findOne({email: email})

    if(!dentist) return 0

    if (email === dentist.email && await bcrypt.compare(password, dentist.email)) {}
}