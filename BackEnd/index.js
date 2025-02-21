const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
app.use(cors())

// const dbCon = require('./utils/db')
const connectDB = require('./utils/db.js')

connectDB()

const fruitRoutes = require('./routes/fruitRoutes.js')

// dbCon()

dotenv.config()
const port = process.env.BACK_END_PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
app.use(express.json())
const indexRoutes = require('./routes/index.js')
app.use('/', indexRoutes)
app.use('/fruits', fruitRoutes)