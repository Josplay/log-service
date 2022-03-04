const { Collection } = require("mongodb");

/**
 *
 * @param {Collection} collection
 * @returns
 */
function getOrganisationLocationLogs(collection) {
  return async (req, res) => {
    const logs = await collection.find({
      organisationUUID: req.params.organisationUUID,
      locationUUID: req.params.locationId,
    }).toArray();

    res.json({
      data: logs,
      message: "Successfully retrieved organisation logs.",
      status: "L200",
    });
  };
}

module.exports = getOrganisationLocationLogs;
