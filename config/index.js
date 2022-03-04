const logger = require('./logger')
const connectDb = require('./mongodb')
const PORT = process.env.PORT || 5000

module.exports = {
  logger,
  connectDb,
  PORT,
}
