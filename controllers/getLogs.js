const { Collection } = require("mongodb");

/**
 * 
 * @param {Collection} collection 
 * @returns 
 */
function getLogs(collection) {
  return async (_, res) => {
    const response = await collection.find({});

    res.json({
      data: response,
      message: "Successfully retrieved all organisations logs.",
      status: "L200",
    });
  }
}

module.exports = getLogs;