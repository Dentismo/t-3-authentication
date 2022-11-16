const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Dentist = require('../model/dentist');

//receive credentials and proceed with login procedure
async function login(message) {
    try {
        //receive string mqtt message and parse to object
        const {email, password} = JSON.parse(message)

        if (!(email && password)) {
            //faulty login attempt
            return 0
        }

        const dentist = await Dentist.findOne({email: email})

        //dentist with given email doesn't exist
        if(!dentist) return 0

        //start sign in process and approve authentication
        if (email === dentist.email && await bcrypt.compare(password, dentist.email)) {
            const token = jwt.sign(
                { clinicId: dentist.clinicId },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            )
            dentist.token = token

            //publish token and id

        } else {
            //not logged in 
            //publish problem
        }
    } catch (error) {
        console.log(error)
    }
}