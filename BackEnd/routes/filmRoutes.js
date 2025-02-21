const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')
getFilm = require('../controllers/filmController')
const date = require('../middleware/middleware')
addFilm = require('../controllers/filmController')

router.get('/', getFilm)
router.post('/', addFilm)

module.exports = router