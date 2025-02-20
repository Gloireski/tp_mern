const dotenv = require('dotenv');

const jwt = require('jsonwebtoken');

// get config vars
dotenv.config();

// const generateToken = (payload) => {
//     const secretKey = process.env.TOKEN_SECRET; // Replace with your own secret key
//     const options = {
//         expiresIn: '1200000', // Token expiration time
//     };

//     const token = jwt.sign(payload, secretKey, options);
//     return token;
// }

const  generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET,
        { expiresIn: '1800s' })
}

module.exports = { generateAccessToken }