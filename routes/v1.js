const {
  createLog,
  getLogs,
  getOrganisationLocationLogs,
  getOrganisationLocationZoneLogs,
  getOrganisationLogs
} = require("../controllers")
const router = require("express").Router();

/**
 * Generates the routing handlers for v1 logs.
 * 
 * @param {Db} db mongodb Database collection
 * @returns
 */
function generateV1(db) {
  router.get("/ping", (_, res) => res.json({ ping: "pong" }));

  router.post("/logs", createLog(db));

  router.get("/logs", getLogs(db));

  router.get("/logs/:organisationId", getOrganisationLogs(db));

  router.get(
    "/logs/:organisationId/:locationId",
    getOrganisationLocationLogs(db)
  );

  router.get(
    "/logs/:organisationId/:locationId/:zoneId",
    getOrganisationLocationZoneLogs(db)
  );

  return router;
}

module.exports = generateV1;
