const { logger } = require("../config")

/**
 * Retrieves all the logs for an organization location.
 * @param {Collection} collection
 * @returns
 */
function getorganizationLocationLogs(collection) {
  return async (req, res) => {
    let logs = []
    try {
      logs = await collection
        .find({
          organizationUUID: req.params.organizationId,
          locationUUID: req.params.locationId,
        })
        .toArray()
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
      data: logs,
      message: 'Successfully retrieved organization logs.',
      status: 'L200',
    })
  }
}

module.exports = getorganizationLocationLogs
