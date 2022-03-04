const { Collection } = require("mongodb");

/**
 *
 * @param {Collection} collection
 * @returns
 */
function getOrganisationLogs(collection) {
  return async (req, res) => {
    const logs = await collection
      .find({ organisationUUID: req.params.organisationId })
      .toArray();

    res.json({
      data: logs,
      message: "Successfully retrieved organisation logs.",
      status: "L200",
    });
  };
}

module.exports = getOrganisationLogs;
