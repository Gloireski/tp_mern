const fruitController = require('../controllers/fruitController')

const router = require('express').Router()
const { upload } = require('../middleware/middleware')

router.get('/', fruitController.getFruit)

router.get('/:id', fruitController.getFruitById)

router.post('/', upload.single("image"), fruitController.addFruit)

router.put('/:id', fruitController.editFruit)

router.delete('/:id', fruitController.deleteFruit)

module.exports = router