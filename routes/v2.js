const {
  createLog,
  getLogs,
  getorganizationLocationLogs,
  getorganizationLocationZoneLogs,
  getorganizationLogs,
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

  router.post('/logs', createLog(collection))

  router.get('/logs', getLogs(collection))

  router.get('/logs/:organizationId', getorganizationLogs(collection))

  router.get(
    '/logs/:organizationId/:locationId',
    getorganizationLocationLogs(collection)
  )

  router.get(
    '/logs/:organizationId/:locationId/:zoneId',
    getorganizationLocationZoneLogs(collection)
  )

  return router
}

module.exports = generateV2
