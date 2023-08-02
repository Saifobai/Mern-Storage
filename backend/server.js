const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleware/errorMiddleWare')

const app = express()


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


// routes
app.use('/api/users', userRoute)


// error handler
app.use(errorHandler)

// connect to the DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT} and connect to the DB`)
        })
    })
    .catch((err) => console.log(err))