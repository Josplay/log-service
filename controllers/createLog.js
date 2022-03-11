const { validationResult } = require("express-validator");

const { logger } = require('../config')
const { errorBuilder } = require('../utils')

/**
 * Creates a new log.
 * @param {Collection} collection A mongodb collection
 * @returns
 */
function createLog(collection) {

  return async (req, res) => {
    const {
      organizationUUID,
      locationUUID,
      zoneUUID,
      collectionUUID,
      playlist,
      track,
      playing,
      networkSpeed,
      deviceId,
    } = req.body

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const serverError = errorBuilder(
        400,
        'Log create  error',
        'Log create error cause by invalid input',
        errors.errors
      );
      return res.status(500).json(serverError);
    }
    try {
      const newPlaylist = {
        UUID: playlist?.UUID,
        title: playlist?.title,
        energy: playlist?.energy,
        playTime: playlist?.playTime,
        tracks: playlist?.tracks,
      }

      const newTrack = {
        UUID: track?.UUID,
        title: track?.title,
        artist: track?.artist,
        duration: track?.duration,
      }

      await collection.insertOne({
        organizationUUID,
        locationUUID,
        zoneUUID,
        collectionUUID,
        playlist: newPlaylist,
        track: newTrack,
        timestamp: new Date(),
        playing,
        networkSpeed,
        deviceId,
      })
      res.json({
        data: req.body,
        message: 'Successfully updated organization logs.',
        status: 'L200',
      })
    } catch (err) {
      logger.error(err)
      const serverError = errorBuilder(
        500,
        'Server Error',
        err.message || 'Server error creating a log',
        err
      );
      return res.status(500).json(serverError);
    }
  }

}

module.exports = createLog
