const express = require('express')
const router = express.Router()
getFilm = require('../controllers/filmController')
addFilm = require('../controllers/filmController')

router.get('/', getFilm)
router.post('/', addFilm)

module.exports = router