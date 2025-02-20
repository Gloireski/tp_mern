const mongoose = require('mongoose')
const mongoclient = require('mongodb').MongoClient
const dotenv = require('dotenv')

dotenv.config()
const url = process.env.db_url
console.log(url)

const connectDB = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connected to the database')
    } catch (error) {
        console.log(error)
    }
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Db connected!'));
// const connect = async () => {
//     try {
//         await mongoclient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//         console.log('Connected to the database')
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = connect
module.exports = mongoose
// module.exports = connectDB