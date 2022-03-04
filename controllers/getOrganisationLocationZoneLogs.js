const { Collection } = require("mongodb");

/**
 *
 * @param {Collection} collection
 * @returns
 */
function getOrganisationLocationZoneLogs(collection) {
  return async (req, res) => {
    const logs = await collection
      .find({
        organisationUUID: req.params.organisationId,
        locationUUID: req.params.locationId,
        zoneUUID: req.params.zoneId,
      })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    res.json({
      data: locationLogs[0] || {},
      message: "Successfully retrieved organisation logs.",
      status: "L200",
    });
  };
}

module.exports = getOrganisationLocationZoneLogs;
