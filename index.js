require('dotenv').config()
const express = require('express')
const generateV1 = require('./routes/v1')
const generateV2 = require('./routes/v2')
const cors = require('cors')
const { connectDb, PORT, logger } = require('./config')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = connectDb()

app.use('/v1/', generateV1(db))
app.use('/v2/', generateV2(db))

app.listen(PORT, () => console.log('Listening at port ', PORT))
app.on('error', logger.error)
