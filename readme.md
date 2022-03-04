# Log Server

Keeps track of all devices logs.


## End Points

__Reference Schema__
```json
{
  "organisation": {
    "UUID": "string",
    "city": "string",
    "country": "string",
    "state": "string",
    "title": "string"
  },
  "location": {
    "UUID": "string",
    "industry": "string",
    "state": "string",
    "zones": ["string"]
  },
  "zone": {
    "UUID": "string",
    "environment": "string",
    "title": "string",
    "zoneType": "string"
  },
  "collection": {
    "UUID": "string",
    "title": "string",
    "industry": "string"
  },
  "playlist": {
    "UUID": "string",
    "title": "string",
    "energy": "string",
    "playTime": "number",
    "tracks": ["string"]
  },
  "track": {
    "UUID": "string",
    "title": "string",
    "artist": "string",
    "duration": "number"
  }
}
```

### Pings

```sh
GET /ping

RESPONSE { 'ping' : 'pong' }
```

### Report a Log
Creates a new log in the database.

```sh
POST v1/logs

{ organization, location, zone, collection, playlist, track }

REPONSE { organization, location, zone, collection, playlist, track }
```

### Get All Logs
Get all logs.

```sh
GET v1/logs


REPONSE [
  {
    name: string,
    documents: [{ organization, location, zone, collection, playlist, track }]
  }
]
```

### Get Organisation Logs

Get all logs for an organisation.

```sh
GET v1/logs/organisationId


REPONSE [{ organization, location, zone, collection, playlist, track }]
```

### Get Location Logs

Get most recent log for a location.

```sh
GET v1/logs/:organisationId/:locationId


REPONSE [{ organization, location, zone, collection, playlist, track }]
```

### Get Zone Logs

Get most recent log for a zone.

```sh
GET v1/logs/:organisationId/:locationId/:zoneId


REPONSE [{ organization, location, zone, collection, playlist, track }]
```
