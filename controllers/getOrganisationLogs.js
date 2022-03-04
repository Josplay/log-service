const { logger } = require("../config")

/**
 * Retrieves all the logs for an organisation.
 * @param {Collection} collection
 * @returns
 */
function getOrganisationLogs(collection) {
  return async (req, res) => {
    const logs = []

    try {
      await collection
      .find({ organisationUUID: req.params.organisationId })
      .toArray()
    } catch(error) {
      logger.error(error)
      res.status(500).json({
        data: null,
        message: 'An error occured while trying to retrieve log.',
        status: 'L500',
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

module.exports = getOrganisationLogs
