const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require("path")
const cors = require('cors')
app.use(cors())

// const dbCon = require('./utils/db')
const connectDB = require('./utils/db')

connectDB()

const fruitRoutes = require('./routes/fruitRoutes')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userRoutes')
const indexRoutes = require('./routes/index')

const fs = require("fs")

// dbCon()

dotenv.config()
const port = process.env.BACK_END_PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
app.use(express.json())
app.use('/', indexRoutes)
app.use('/fruits', fruitRoutes)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
// Serve static files from the 'uploads' folder
const uploadDir = path.join(__dirname, 'uploads');
 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Created uploads directory');
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
