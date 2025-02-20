const jwt = require('jsonwebtoken')

const date = (req, res, next) => {
    const now = new Date()
    console.log(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()} - ${req.method} - ${req.url}`)

    next()
}

const validToken = (req, res, next) => {
    next()
}
module.exports = date
module.exports = validToken