const { Collection } = require("mongodb");

/**
 * 
 * @param {Collection} collection 
 * @returns 
 */
function getOrganisationLocationLogs(collection) {
  return async (req, res) => {
    const logs = await collection.find({ locationUUID: req.params.locationId })

    res.json({
      data: logs,
      message: "Successfully retrieved organisation logs.",
      status: "L200",
    });
  }
}

module.exports = getOrganisationLocationLogs