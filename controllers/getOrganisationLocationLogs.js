const { logger } = require("../config")

/**
 * Retrieves all the logs for an organisation location.
 * @param {Collection} collection
 * @returns
 */
function getOrganisationLocationLogs(collection) {
  return async (req, res) => {
    let logs = []
    try {
      logs = await collection
        .find({
          organisationUUID: req.params.organisationUUID,
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
      message: 'Successfully retrieved organisation logs.',
      status: 'L200',
    })
  }
}

module.exports = getOrganisationLocationLogs
