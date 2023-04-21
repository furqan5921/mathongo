
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8088
const DBconnection = require("./config/dbConnect")
const userRouter = require("./routes/auth")
const shortUrlRouter = require("./routes/shortUrl")
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/users", userRouter)
// app.use("/shortenURL", shortUrlRouter)


DBconnection()
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
