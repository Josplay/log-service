const { validationResult } = require("express-validator");
const { errorBuilder } = require("../utils")
const { logger } = require('../config')

/**
 * Retrieves the most recent organization zone log.
 * @param {Collection} collection
 * @returns
 */
function getOrganizationLocationZoneLogs(collection) {
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
      const logs = await collection
        .find({
          organizationUUID: req.params.organizationId,
          locationUUID: req.params.locationId,
          zoneUUID: req.params.zoneId,
        })
        .sort({ _id: -1 })
        .limit(1)
        .toArray()
      res.json({
        data: logs[0] || {},
        message: 'Successfully retrieved organization logs.',
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

module.exports = getOrganizationLocationZoneLogs
