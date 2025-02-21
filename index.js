const express = require('express')
const app = express()
const dotenv = require('dotenv')

// const dbCon = require('./utils/db')
const connectDB = require('./utils/db')

connectDB()

const filmRoutes = require('./routes/filmRoutes')
const fruitRoutes = require('./routes/fruitRoutes')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userRoutes')
const indexRoutes = require('./routes/index')

// dbCon()

dotenv.config()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
app.use(express.json())
app.use('/', indexRoutes)
app.use('/films', filmRoutes)
app.use('/fruits', fruitRoutes)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)