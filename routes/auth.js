const router = require('express').Router()
const AuthController = require('../controllers/authController')
const { validateToken } = require('../middleware/middleware')
const { generateAccessToken } =  require('../utils/auth')

/* authenticate user */
router.get('/login', AuthController.login)

/* disconnect user. */
router.get('/logout', AuthController.logout)

// test token validation
router.get('/loggedIn?', validateToken, AuthController.isloggedIn)

router.post('/createNewUser', (req, res) => {
    // ...
  
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
  
    // ...
  });

module.exports = router;