/**
 * Retrieves all the logs in the database.
 * @param {Collection} collection
 * @returns
 */
function getLogs(collection) {
  return async (_, res) => {
    const response = await collection.find({}).toArray()

    res.json({
      data: response,
      message: 'Successfully retrieved all organisations logs.',
      status: 'L200',
    })
  }
}

module.exports = getLogs