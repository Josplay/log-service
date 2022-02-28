const { Db } = require("mongodb");
const router = require("express").Router();

/**
 * Generates the routing handlers for v1 logs.
 *
 * - it uses not controllers because the 'db' parameter
 * already acts like one, and that would  be a useless extra layer.
 *
 * @param {Db} db mongodb Database collection
 * @returns
 */
function generateV1(db) {
  router.get("/ping", (_, res) => res.send({ ping: "pong" }));

  router.post("/logs", async (req, res) => {
    const { organization, location, zone, collection, playlist, track, playing, networkSpeed } =
      req.body;

    // Filtering data to only the essentials to save space.
    const newOrganisation = {
      UUID: organization?.UUID,
      city: organization?.city,
      country: organization.country,
      state: organization?.state,
      title: organization?.title,
    };

    const newLocation = {
      UUID: location?.UUID,
      industry: location?.industry,
      state: location?.state,
      zones: location?.zones,
    };

    const newZone = {
      UUID: zone?.UUID,
      environment: zone?.environment,
      title: zone?.title,
      zoneType: zone?.zoneType,
    };

    const newCollection = {
      UUID: collection?.UUID,
      title: collection?.title,
      industry: collection?.industry,
      playlists: collection?.playlists,
    };

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

    db.collection(organization.UUID).insertOne({
      zone: newZone,
      collection: newCollection,
      location: newLocation,
      organization: newOrganisation,
      playlist: newPlaylist,
      track: newTrack,
      timestamp: new Date(),
      playing,
      networkSpeed,
    });

    res.send({
      data: req.body,
      message: "Successfully updated organisation logs.",
      status: "L200",
    });
  });

  router.get("/logs", async (_, res) => {
    const allOrganisationsLogs = await db.collections();

    const response = await Promise.all(
      allOrganisationsLogs.map(async (collection) => ({
        name: collection.collectionName,
        documents: await collection.find({}).toArray(),
      }))
    );

    res.send({
      data: response,
      message: "Successfully retrieved all organisations logs.",
      stauts: "L200",
    });
  });

  router.get("/logs/:organisationId", async (req, res) => {
    const organisationLogs = await db
      .collection(req.params.organisationId)
      .find({})
      .toArray();

    res.send({
      data: organisationLogs,
      message: "Successfully retrieved organisation logs.",
      status: "L200",
    });
  });

  router.get("/logs/:organisationId/:locationId", async (req, res) => {
    const locationLogs = await db
      .collection(req.params.organisationId)
      .find({ "location.UUID": req.params.locationId })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    res.send({
      data: locationLogs[0] || {},
      message: "Successfully retrieved organisation logs.",
      status: "L200",
    });
  });

  router.get("/logs/:organisationId/:locationId/:zoneId", async (req, res) => {
    const locationLogs = await db
      .collection(req.params.organisationId)
      .find({
        "location.UUID": req.params.locationId,
        "zone.UUID": req.params.zoneId,
      })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    res.send({
      data: locationLogs[0] || {},
      message: "Successfully retrieved organisation logs.",
      status: "L200",
    });
  });

  return router;
}

module.exports = generateV1;
