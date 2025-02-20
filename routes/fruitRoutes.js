const fruitController = require('../controllers/fruitController')

const router = require('express').Router()

router.get('/', fruitController.getFruit)

router.get('/:id', (req, res) => {
    res.send(`Hello World ${req.params.id}`)
})

router.post('/', fruitController.addFruit)

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name, category, description, price, origin, img_url } = req.body
    res.send(`ID: ${id}, Name: ${name}, Category: ${category}, Description: ${description}, Price: ${price}, Origin: ${origin}, Image URL: ${img_url}`)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.send(`ID: ${id}`)
})

module.exports = router