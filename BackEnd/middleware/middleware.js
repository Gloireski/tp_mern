const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { checkInvalidatedToken } = require('../utils/redis')
const redisClient = require('../utils/redis')
const multer = require("multer")
const path = require("path")


dotenv.config()

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Ensure that the 'uploads' folder exists in your project root
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      // Create a unique filename using the current timestamp and original file extension.
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });
   
  // File filter to only accept images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  };
   
// Initialize Multer middleware
const upload = multer({
    storage,
    fileFilter,
});

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
        
    } else {
        res.status(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
};

module.exports = { validateToken, date, upload }
// module.exports = validToken