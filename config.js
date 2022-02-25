const dotenv = require('dotenv')

dotenv.config();

/**
 * You can't set your default after the '||' flags,
 * but I advice you set at as an env variable manually or
 * through a .env file (follow the template.env).
 */
module.exports = {
  /**
   * MongoDB url with out the database attached. If authenticated, 
   * attach the complete auth details to the url request.
   */
  mongoDatabaseUrl: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/',

  /**
   * MongoDB database name for storing the application logs,
   * please don't you 'logs' because it might be in use.
   */
  mongoDatabaseName: process.env.MONGO_DB_NAME || 'dev-logs',

  /**
   * Server port
   */
  port: process.env.PORT || 5000,
}