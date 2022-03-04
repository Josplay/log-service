const { Collection } = require("mongodb");

/**
 * 
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
    } = req.body;

    const newPlaylist = {
      UUID: playlist?.UUID,
      title: playlist?.title,
      energy: playlist?.energy,
      playTime: playlist?.playTime,
      tracks: playlist?.tracks,
    };

    const newTrack = {
      UUID: track?.trackUUID,
      title: track?.title,
      artist: track?.artist,
      duration: track?.duration,
    };

    collection.insertOne({
      organisationUUID,
      locationUUID,
      zoneUUID,
      collectionUUID,
      playlist: newPlaylist,
      track: newTrack,
      timestamp: new Date(),
      playing,
      networkSpeed,
    });

    res.json({
      data: req.body,
      message: "Successfully updated organisation logs.",
      status: "L200",
    });
  };
}

module.exports = createLog;
