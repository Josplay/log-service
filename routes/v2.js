const { check } = require('express-validator');

const {
  createLog,
  getLogs,
  getOrganizationLocationLogs,
  getOrganizationLocationZoneLogs,
  getOrganizationLogs,
} = require('../controllers')
const router = require('express').Router()

/**
 * Generates the routing handlers for v2 logs.
 *
 * @param {Db} db mongodb Database collection
 * @returns
 */
function generateV2(db) {
  const collection = db.collection('play-logs')

  router.get('/ping', (_, res) => res.json({ ping: 'pong' }))

  router.post('/logs',
    [
      check(["track.trackUUID", "track.title", "track.artist"]).isString().withMessage("Playlist UUID, title, and artist required"),
      check(["track.duration",]).optional({ nullable: true }).isFloat(),
      check(["playing",]).isBoolean(),
      check("networkSpeed").isString(),
      check(["organizationUUID", "locationUUID", "zoneUUID", "collectionUUID"]).isUUID().withMessage("UUIDs required"),
      check([
        "playlist.UUID",
        "playlist.title",
        "playlist.energy",
        "playlist.playTime"]).isString().withMessage("Playlist UUID, title, energy and playTime required"),
      check(["playlist.tracks.*"]).isUUID().withMessage("UUIDs expected for playlist.tracks")

    ],
    createLog(collection))

  router.get('/logs', getLogs(collection))

  router.get('/logs/:organizationId',
    [check("organizationId").isUUID().withMessage("organizationID expected to be a UUID")],
    getOrganizationLogs(collection))

  router.get(
    '/logs/:organizationId/:locationId',
    [check(["organizationId", "locationId"]).isUUID().withMessage("organizationId and locationId expected to be UUIDs")],
    getOrganizationLocationLogs(collection)
  )

  router.get(
    '/logs/:organizationId/:locationId/:zoneId',
    [check([
      "organizationId",
      "locationId",
      "zoneId"
    ]).isUUID().withMessage("organizationId, locationId, zoneId expected to be UUIDs")],
    getOrganizationLocationZoneLogs(collection)
  )

  return router
}

module.exports = generateV2
