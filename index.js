require('dotenv').config()
const express = require('express')
const generateV1 = require('./routes/v1')
const http = require('http')
const cors = require('cors')
const { connectDb, PORT } = require('./config')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = connectDb()

app.use('/v1/', generateV1(db))

const server = http.createServer(app)

server.listen(PORT, () => console.log('Listening at port ', PORT))

server.on('error', console.error)
