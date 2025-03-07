const uuidv4 = require('uuid').v4
const sha1 = require('sha1')
const { User } = require('../models/users')
const { generateAccessToken } = require('../utils/auth')
const redisClient = require('../utils/redis')

class authController {

    static async login(req, res){
        console.log('log user in')
        const auth = req.headers.authorization || null
        // si aucune info de connnexion fournie
        if (!auth) {
            return res.status(401).json({ error: "Unauthorized "})
        }
        // extraire les datas de login encodees depuis le front
        // email+':'+password
        const encoded = auth.split(' ')[1];
        const decoded = Buffer.from(encoded, 'base64').toString();
        const email = decoded.split(':')[0];
        const password = decoded.split(':')[1];
        console.log(email+' hey '+password);
        let user;
        try {
            user = await User.findOne({ email: email });
            console.log(user)
        } catch (e) {
            console.error(e)
            return res.status(401).send(error)
        }
        // console.log(user)
        console.log(sha1(password))
        if (!user || password !== user.password) {
            return res.status(401).json({ success: false,
                message: 'Invalid email or password', });
        }
        // const token = uuidv4();
        const token = generateAccessToken({ id: user.id, username: user.username, email: user.email })
        const userId = user._id.toString()
        // await setValue(`auth_${token}`, userId, 24 * 60 * 60)
        // Store the token in Redis (optional, for token invalidation)
        redisClient.set(`token_${user.id}`, token, 'EX', 3600); // Expire in 1 hour

        // await redisClient.set(`auth_${token}`, user.id.toString(), 24 * 60 * 60);
        res.status(200).json({ token, user })
    }

    static async logout(req, res){
        const token = req.headers['authorization'].split(' ')[1];
        console.log(`log user out ${token}`)
        // const tok = await getValue(`auth_${req.token}`)
        if (!token) {
            return res.status(401).json({message: 'Unauthoried'})
        }
        
        // invalidate user
        // await deleteValue(`auth_${req.token}`)
        // Add the token to the Redis blacklist
        try {
            redisClient.set(`blacklist_${token}`, 'invalidated', 'EX', 3600); // Expire in 1 hour
            return res.status(200).json({ message: "log out succesfully"})
        } catch(error) {
            res.status(500).json({ message: 'Logout failed', error: error.message });
        }
        // await redisClient.del(`auth_${token}`);
        // res.send('logout')
    }

    static async isloggedIn(req, res) {
       
    }
}

module.exports = authController