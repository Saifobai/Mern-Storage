const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express()



// connect to the DB 

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT} and connect to the DB`)
        })
    })
    .catch((err) => console.log(err))