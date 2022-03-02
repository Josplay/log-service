const { MongoClient } = require("mongodb");
const logger = require("./logger")

const host = process.env.DEV_DB_HOST || "localhost";
const port = process.env.DEV_DB_PORT || "27017";
const name =
    process.env.NODE_ENV === "test"
        ? "default-log-service"
        : process.env.DEV_DB_NAME || "default-log-service";
const atlasURL = process.env.MONGODB_URI;

const URI = atlasURL || `mongodb://${host}:${port}/${name}`;

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true
}

/**
 * Connects to a mongo db and returns the dbclient
 * @param {String} db_uri uri of db to connect
 * @param {String} db_name Name of the db to connect 
 */
const connectDb = (db_uri = URI, db_name = name) => {
    const client = new MongoClient(db_uri, OPTIONS);
    try {
        client.connect();
        const db = client.db(db_name);
        logger.info(`Db successfully connected - ${db.databaseName}`)
        return db;
    } catch (error) {
        logger.error(`Error connecting to mongoclient -- ${error}`)
    } finally {
        client.close()
    }
}
module.exports = connectDb;

