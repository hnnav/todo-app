// import modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')

// database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB CONNECTED"))
    .catch(err => console.log("DB CONNECTION ERROR", err))

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// routers
const itemsRouter = require('./controllers/item')
app.use('/api/items', itemsRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

// port
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is running on ${port}`))