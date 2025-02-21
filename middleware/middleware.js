const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { checkInvalidatedToken } = require('../utils/redis')
const redisClient = require('../utils/redis')

dotenv.config()

const date = (req, res, next) => {
    const now = new Date()
    console.log(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()} - ${req.method} - ${req.url}`)

    next()
}

// Middleware for JWT Token Validation
const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        // console.log(token)

        try {
        //     jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        //         if (err) {
        //             return res.status(403).json({
        //                 success: false,
        //                 message: 'Invalid token',
        //             });
        //         } 
    
        //     console.log("valid token")
        // })
            const user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (!user) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            }
            const data = await redisClient.get(`blacklist_${token}`);

            if (data) {
                return res.status(403).json({ message: 'Token is invalidated.' });
            }

            req.payload = user;
            next();
        } catch(error){
            return res.status(500).json({ message: `Internal server error. ${error}` });
        }
        // jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        //     if (err) {
        //         return res.status(403).json({
        //             success: false,
        //             message: 'Invalid token',
        //         });
        //     } 

        // console.log("valid token")
        // redisClient.get(`blacklist_${token}`, (err, data) => {
        //     console.log("valid token check")  
        //     if (err) {
        //     console.log(err)
        //     return res.status(500).json({ message: 'Internal server error.' });
        //     }

        //     if (data) {
        //     return res.status(403).json({ message: 'Token is invalidated.' });
        //     }

        //     // Attach the user payload to the request object
        //     req.payload = payload
        //     next();
        // })
        
    } else {
        res.status(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
};

module.exports = { validateToken, date }
// module.exports = validToken