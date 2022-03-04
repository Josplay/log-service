const { logger } = require("../config")

/**
 * Creates a new log.
 * @param {Collection} collection
 * @returns
 */
function createLog(collection) {
  return async (req, res) => {
    const {
      organisationUUID,
      locationUUID,
      zoneUUID,
      collectionUUID,
      playlist,
      track,
      playing,
      networkSpeed,
    } = req.body

    try {
      const newPlaylist = {
        UUID: playlist?.UUID,
        title: playlist?.title,
        energy: playlist?.energy,
        playTime: playlist?.playTime,
        tracks: playlist?.tracks,
      }
  
      const newTrack = {
        UUID: track?.trackUUID,
        title: track?.title,
        artist: track?.artist,
        duration: track?.duration,
      }

      await collection.insertOne({
        organisationUUID,
        locationUUID,
        zoneUUID,
        collectionUUID,
        playlist: newPlaylist,
        track: newTrack,
        timestamp: new Date(),
        playing,
        networkSpeed,
      })
    } catch(error) {
      logger.error(error)
      res.status(500).json({
        data: null,
        message: "An error occured while trying to persist log.",
        status: "L500"
      })
      return;
    }

    res.json({
      data: req.body,
      message: 'Successfully updated organisation logs.',
      status: 'L200',
    })
  }
}

module.exports = createLog
