const mongoose = require('mongoose')
const { Fruit, fruitValidation } = require('../models/fruits')

class fruitController {
    /**
     * Route to get all fruits
     * @param {*} req 
     * @param {*} res 
     */
    static async getFruit(req, res) {
        console.log("before request")
        const fruits = await Fruit.find()
        console.log(fruits)
        res.status(200).json(fruits).send()
        // res.send('Hello World')
    }

    /**
     * Route to add a fruit
     * @param {*} req 
     * @param {*} res 
     */
    static async addFruit(req, res) {
        try {
            console.log(req.body)
            const { error, value } = fruitValidation.validate(req.body)
            if (error) {
                return res.status(400).json({ msg: error.details[0].message})
            }
            const fruit = new Fruit(value)
            console.log(value)
            await fruit.save()
            res.status(201).send(fruit)
        } catch (error) {
            console.log(error)
            res.status(500).send("Erreur lors de l'ajout du fruit")
        }
    }
}

// module.exports = fruitController
module.exports = fruitController