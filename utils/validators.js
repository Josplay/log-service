/**
 * Checks if a string is a UUID
 * @param {string} uuid input
 * @returns true for a valid UUID and false of invalid
 */
function validateUUID(uuid) {
  return !!uuid.match(validateUUID.UUID_VALIDATION_REGEXP)
}

validateUUID.UUID_VALIDATION_REGEXP =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/**
 * Checks if a playlist is valid (according to the api schema)
 * @param {Playlist} playlist receives a playlist
 * @returns an empty string for a valid playlist and an error string for an invalid playlist.
 */
function checkPlaylist(playlist) {
  if (!playlist) {
    return 'Expecting a playlist.'
  } else if (!playlist.UUID) {
    return 'Playlist is missing a UUID.'
  } else if (!playlist.title) {
    return 'Playlist is missing a title.'
  } else if (!playlist.energy) {
    return 'Playlist is missing the energy.'
  } else if (!playlist.playTime) {
    return 'Playlist is missing a playTime'
  } else if (!playlist.tracks) {
    return 'Playlist is missing tracks'
  }
  return ''
}

/**
 * Checks if a track is valid
 * @param {Track} track a track
 * @returns an empty string for a valid track and an error string for an invalid track.
 */
function checkTrack(track) {
  if (!track) {
    return 'Expecting a track'
  } else if (!track.trackUUID) {
    return 'Track is missing UUID'
  } else if (!track.title) {
    return 'Track is missing a title.'
  } else if (!track.artist) {
    return 'Track is missing an artist.'
  } else if (!track.duration) {
    return 'Track is missing a duration.'
  }

  return ''
}

/**
 * Checks if a Log is valid
 * @param {string} organizationUUID
 * @param {string} locationUUID
 * @param {string} zoneUUID
 * @param {string} collectionUUID
 * @param {Playlist} playlist
 * @param {Track} track
 * @param {boolean} playing
 * @param {string} networkSpeed
 * @returns an empty string for valid log and an error string for an invalid log.
 */
function checkLogs(
  organizationUUID,
  locationUUID,
  zoneUUID,
  collectionUUID,
  playlist,
  track,
  playing,
  networkSpeed
) {
  if (!validateUUID(organizationUUID)) {
    return 'Invalid organization UUID.'
  } else if (!validateUUID(locationUUID)) {
    return 'Invalid location UUID.'
  } else if (!validateUUID(zoneUUID)) {
    return 'Invalid zone UUID.'
  } else if (!validateUUID(collectionUUID)) {
    return 'Invalid collection UUID.'
  } else if (typeof playing !== 'boolean') {
    return (
      'Expected playing to be a boolean but instead recieved a ' +
      typeof playing
    )
  } else if (typeof networkSpeed !== 'string') {
    return (
      'Expected networkSpeed of type stirng but instead recieved a ' +
      typeof networkSpeed
    )
  }

  const playlistError = checkPlaylist(playlist)

  if (playlistError) return playlistError

  const trackError = checkTrack(track)

  if (trackError) return trackError
}

module.exports = {
  checkLogs,
}
