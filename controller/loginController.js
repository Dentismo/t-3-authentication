const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Dentist = require('../model/dentist');

//receive credentials and proceed with login procedure
const login = async (message) => {
  try {
    //receive string mqtt message and parse to object
    const {email, password} = message;

    if (!(email && password)) {
      //faulty login attempt
      return {message: 'Invalid Credentials'};
    }

    const dentist = await Dentist.findOne({email: email});

    //dentist with given email doesn't exist
    if(!dentist) return {message: 'Dentist could not be found with given email'};

    //start sign in process and approve authentication
    if (await bcrypt.compare(password, dentist.password)) {
      const token = jwt.sign(
        { clinicId: dentist.clinicId },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      );
      dentist.token = token;

      return {token: dentist.token, id: dentist._id, clinicId: dentist.clinicId}; 

    } else {
      return {message: 'Incorrect Credentials'};
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = login;