const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
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
    /**
     * Route to edit a fruit
     * @param {*} req 
     * @param {*} res 
     */
    static async editFruit(req, res) {
        const id = req.params.id.trim()
        console.log(id)
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Id invalide")
        }
        let fruit = await Fruit.findById(id)
        console.log(fruit)
        if (!fruit){
            return res.status(404).send(`Aucun fruit associé à l'id ${id}`)
        }
        try {
            const { error, value } = fruitValidation.validate(req.body)
            if (error) {
                res.status(400).json({msg: error.details[0].message})
            }
            console.log("etape maj")
            const { name, category, description, price, origin, image_url } = req.body
            fruit = await Fruit.findByIdAndUpdate(
                id,
                {
                    name,
                    category,
                    description,
                    price,
                    origin,
                    image_url
                },
                { new: true }
            )
            

            res.status(202).json(fruit)
        } catch(error) {
            console.log(error)
            res.status(500).send("Erreur lors de la modification du fruit")
        }
    }
}

// module.exports = fruitController
module.exports = fruitController