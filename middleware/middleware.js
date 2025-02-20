const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const date = (req, res, next) => {
    const now = new Date()
    console.log(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()} - ${req.method} - ${req.url}`)

    next()
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

// Middleware for JWT Token Validation
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        console.log(token);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            } else {
                req.user = payload;
                next();
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
};

module.exports = { validateToken, date }
// module.exports = validToken