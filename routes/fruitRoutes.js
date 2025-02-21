const fruitController = require('../controllers/fruitController')

const router = require('express').Router()

router.get('/', fruitController.getFruit)

router.get('/:id', fruitController.getFruitById)

router.post('/', fruitController.addFruit)

router.put('/:id', fruitController.editFruit)

router.delete('/:id', fruitController.deleteFruit)

module.exports = router