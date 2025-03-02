const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const { Fruit, fruitValidation } = require('../models/fruits')
const path = require('path');
const fs = require('fs')

class fruitController {
    /**
     * Route to get all fruits
     * @param {*} req 
     * @param {*} res 
     */
    static async getFruit(req, res) {
        try {
            const fruits = await Fruit.find()
            console.log(fruits)
            res.status(200).json(fruits)
        } catch(error) {
            console.error('Error fetching fruits:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    /**
     * Route to add a fruit
     * @param {*} req 
     * @param {*} res 
     */
    static async addFruit(req, res) {
        // const { name, category, description, price, origin } = req.body;
        // console.log(req.body)

        try {
            const { name, category, description, price, origin } = req.body
            // Check if the fruit already exists
            let fruit = await Fruit.findOne({ name: req.body.name, origin: req.body.origin })
            if (fruit) {
                return res.status(400).json({ message: "fruit already exist" })
            }
             // Handle file upload
            const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;
            // console.log(image_url)
            // Create and save the new fruit
            fruit = new Fruit({
                name,
                category,
                description,
                price,
                origin,
                image_url
            })
            
            await fruit.save()
            res.status(201).json(fruit)
        } catch (error) {
            console.error('Error adding fruit:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    /**
     * Route to edit a fruit
     * @param {*} req 
     * @param {*} res 
     */
    static async editFruit(req, res) {
        const id = req.params.id.trim()
        // console.log(id)
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Id invalide")
        }

        try {
             let fruit = await Fruit.findById(id)
            // console.log(fruit)
            if (!fruit){
                return res.status(404).json({ message: 'Fruit not found' });
            }
            const { name, category, description, price, origin } = req.body
            //handle file upload
            let image_url = fruit.image_url;
            if (req.file) {
                // Delete the old image file if it exists
                if (fruit.image_url) {
                    const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(fruit.image_url));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }

                // Set the new image URL
                image_url = `http://localhost:5000/uploads/${req.file.filename}`;
            }

            // image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : fruit.image_url;
            // console.log(req.file)
            // if (!image_url) {
            //     return res.status(400).json({msg: "Image missing"})
            // }
            // const { error, value } = fruitValidation.validate(req.body)
            if (!req.body) {
                return res.status(400).json({msg: "fields missings"})
            }
            // console.log("etape maj")
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
            console.error('Error updating fruit:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async getFruitById(req, res) {
        const id = req.params.id.trim()
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        try {
            const fruit = await Fruit.findById(id)
            if (!fruit){
                return res.status(404).json({message: `Aucun fruit associé à l'id ${id}`})
            }
            return res.status(200).json(fruit)
        } catch(error) {
            console.error('Error fetching fruit:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async deleteFruit(req, res) {
        const id = req.params.id.trim()
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' })
        }

        try {
            let fruit = await Fruit.findById(id)
            if (!fruit){
                return res.status(404).json({message: `Aucun fruit associé à l'id ${id}`})
            }

            // Delete the associated image file if it exists
            if (fruit.image_url) {
                const imagePath = path.join(__dirname, '..', 'uploads', path.basename(fruit.image_url));
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            fruit = await Fruit.deleteOne({_id: id})
            res.status(200).json({ message: 'Fruit deleted successfully' }); 
    
        } catch(error) {
            console.error('Error deleting fruit:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// module.exports = fruitController
module.exports = fruitController