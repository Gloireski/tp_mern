const fruitController = require('../controllers/fruitController')

const router = require('express').Router()

router.get('/', fruitController.getFruit)

router.get('/:id', (req, res) => {
    res.send(`Hello World ${req.params.id}`)
})

router.post('/', fruitController.addFruit)

router.put('/:id', fruitController.editFruit)

router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.send(`ID: ${id}`)
})

module.exports = router