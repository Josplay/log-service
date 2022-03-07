const { logger } = require('../config')

/**
 * Retrieves the most recent organisation zone log.
 * @param {Collection} collection
 * @returns
 */
function getOrganisationLocationZoneLogs(collection) {
  return async (req, res) => {
    let logs = []

    try {
      logs = await collection
        .find({
          organisationUUID: req.params.organisationId,
          locationUUID: req.params.locationId,
          zoneUUID: req.params.zoneId,
        })
        .sort({ _id: -1 })
        .limit(1)
        .toArray()
    } catch (error) {
      logger.error(error)
      res.status(500).json({
        data: null,
        message: 'An error occured while trying to retrieve log.',
        status: 'L500',
      })
      return
    }

    res.json({
      data: logs[0] || {},
      message: 'Successfully retrieved organisation logs.',
      status: 'L200',
    })
  }
}

module.exports = getOrganisationLocationZoneLogs
