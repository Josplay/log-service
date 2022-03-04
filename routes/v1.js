const { Db } = require("mongodb");
const {
  createLog,
  getLogs,
  getOrganisationLocationLogs,
  getOrganisationLocationZoneLogs,
  getOrganisationLogs,
} = require("../controllers");
const router = require("express").Router();

/**
 * Generates the routing handlers for v1 logs.
 *
 * @param {Db} db mongodb Database collection
 * @returns
 */
function generateV1(db) {
  const collection = db.collection("play-logs");

  router.get("/ping", (_, res) => res.json({ ping: "pong" }));

  router.post("/logs", createLog(collection));

  router.get("/logs", getLogs(collection));

  router.get("/logs/:organisationId", getOrganisationLogs(collection));

  router.get(
    "/logs/:organisationId/:locationId",
    getOrganisationLocationLogs(collection)
  );

  router.get(
    "/logs/:organisationId/:locationId/:zoneId",
    getOrganisationLocationZoneLogs(collection)
  );

  return router;
}

module.exports = generateV1;
