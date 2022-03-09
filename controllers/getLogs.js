const { validationResult } = require("express-validator");
const { errorBuilder } = require("../utils")
const { logger } = require("../config")

/**
 * Retrieves all the logs in the database.
 * @param {Collection} collection A mongodb collection
 * @returns
 */
function getLogs(collection) {
  return async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const serverError = errorBuilder(
        400,
        'Log create  error',
        'Log create error cause by invalid input',
        errors.errors
      );
      return res.status(500).json(serverError);
    }
    try {
      const response = await collection.find({}).toArray()
      res.json({
        data: response,
        message: 'Successfully retrieved all organizations logs.',
        status: 'L200',
      })
    } catch (err) {
      logger.error(err)
      const serverError = errorBuilder(
        500,
        'Server Error',
        err.message || 'Server error fetching logs.',
        err
      );
      return res.status(500).json(serverError)
    }
  }
}

module.exports = getLogs
