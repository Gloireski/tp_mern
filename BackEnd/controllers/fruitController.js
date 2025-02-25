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
        res.status(200).json(fruits)
        // res.send('Hello World')
    }

    /**
     * Route to add a fruit
     * @param {*} req 
     * @param {*} res 
     */
    static async addFruit(req, res) {
        // const { name, category, description, price, origin } = req.body;
        console.log(req.body)

        try {
            // console.log(req.body)
            const { name, category, description, price, origin } = req.body
            // if (error) {
            //     return res.status(400).json({ msg: error.details[0].message})
            // }
            const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;
            console.log(image_url)
            let fruit = await Fruit.findOne({ name: req.body.name, origin: req.body.origin })
            if (fruit) {
                return res.status(400).json({ message: "fruit existant" })
            }
            fruit = new Fruit({
                name,
                category,
                description,
                price,
                origin,
                image_url
            })
            
            await fruit.save()
            res.status(201).json({
                name,
                category,
                description,
                price,
                origin,
                image_url
            })
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
            // console.log(req.body)
            const { name, category, description, price, origin } = req.body
            const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;
            console.log(req.file)
            if (!image_url) {
                return res.status(400).json({msg: "Image missing"})
            }
            // const { error, value } = fruitValidation.validate(req.body)
            if (!req.body) {
                return res.status(400).json({msg: "fields missings"})
            }
            console.log("etape maj")
            // const { name, category, description, price, origin, image_url } = req.body
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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async getFruitById(req, res) {
        const id = req.params.id.trim()
        console.log(id)
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Id invalide")
        }
        const fruit = await Fruit.findById(id)
        console.log(fruit)
        if (!fruit){
            return res.status(404).send(`Aucun fruit associé à l'id ${id}`)
        }
        return res.status(200).json(fruit)
    }
    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async deleteFruit(req, res) {
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
        fruit = await Fruit.deleteOne({_id: id})
            // Fruit.save()
        return res.status(204).send()

    }
}

// module.exports = fruitController
module.exports = fruitController