const { validationResult } = require("express-validator");
const { errorBuilder } = require("../utils")
const { logger } = require("../config")

/**
 * Retrieves all the logs for an organization location.
 * @param {Collection} collection
 * @returns
 */
function getOrganizationLocationLogs(collection) {
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
        })
        .toArray()
      res.json({
        data: logs,
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

module.exports = getOrganizationLocationLogs
