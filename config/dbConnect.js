const mongoose = require('mongoose')

const dbConnect = () => {
    try {
        console.log("db connect")
        return mongoose.connect(process.env.DB_URL)
    } catch (err) {
        console.log("db connect error: " + err)
    }
}

module.exports = dbConnect;