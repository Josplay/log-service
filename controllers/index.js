const getLogs = require('./getLogs')
const getOrganisationLogs = require('./getOrganisationLogs')
const createLog = require('./createLog')
const getOrganisationLocationLogs = require('./getOrganisationLocationLogs')
const getOrganisationLocationZoneLogs = require('./getOrganisationLocationZoneLogs')

module.exports = {
  getLogs,
  getOrganisationLocationLogs,
  createLog,
  getOrganisationLocationZoneLogs,
  getOrganisationLogs,
}
