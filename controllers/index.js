const getLogs = require('./getLogs')
const getOrganizationLogs = require('./getOrganizationLogs')
const createLog = require('./createLog')
const getOrganizationLocationLogs = require('./getOrganizationLocationLogs')
const getOrganizationLocationZoneLogs = require('./getOrganizationLocationZoneLogs')

module.exports = {
  getLogs,
  getOrganizationLocationLogs,
  createLog,
  getOrganizationLocationZoneLogs,
  getOrganizationLogs,
}
