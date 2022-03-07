const { logger } = require("../config")

/**
 * Retrieves all the logs in the database.
 * @param {Collection} collection
 * @returns
 */
function getLogs(collection) {
  return async (_, res) => {
    let response = []
    try {
      response = await collection.find({}).toArray()
    } catch(error) {
      logger.error(error)
      res.status(500).json({
        data: null,
        message: "An error occured while trying to retrieve log.",
        status: "L500"
      })
      return
    }

    res.json({
      data: response,
      message: 'Successfully retrieved all organizations logs.',
      status: 'L200',
    })
  }
}

module.exports = getLogs
