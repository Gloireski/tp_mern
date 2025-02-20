const express = require('express')
const app = express()
const dotenv = require('dotenv')

// const dbCon = require('./utils/db')
const connectDB = require('./utils/db')

connectDB()

const filmRoutes = require('./routes/filmRoutes')
const fruitRoutes = require('./routes/fruitRoutes')

// dbCon()

dotenv.config()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
app.use(express.json())
app.use('/', require('./routes/index'))
app.use('/films', filmRoutes)
app.use('/fruits', fruitRoutes)