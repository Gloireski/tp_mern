const { User, userValidation } = require("../models/users")
const ObjectId = require('mongoose').Types.ObjectId
const sha1 = require('sha1')

class userController {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async getAll(req, res) {
            // console.log("before request")
            const users = await User.find()
            console.log(users)

            res.status(200).json(users).send()
    }

    static async getMe(req, res) {
        const id = req.params.id.trim()
        console.log(id)
        if (!ObjectId.isValid(id)) {
            return res.status(401).send("Id invalide")
        }
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        console.log(user)

        res.status(200).json(user).send()
    }
    /**
     * Route for register users
     * @param {*} req 
     * @param {*} res 
     */
    static async signUp(req, res) {
        const { error, value } = userValidation.validate(req.body)
        console.log(value)
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: "utilisateur existe" })
        }
        try {
            const newUser = new User(value)
            console.log(value)
            await newUser.save()
            res.status(201).send(newUser)
        } catch(error){
            console.log(error)
            res.status(500).send("Erreur lors de l'ajout du user")
        }

    }
}

module.exports = userController