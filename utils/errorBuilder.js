const ErrorMessage = require("./error-message");
const { logger } = require("../config");

/**
 * Builds up an error object that could be passed to next() argument of a middleware or controller.
 *
 * ```
 * // In a controller or middleware
 * const err = errorBuilder(433, 'Bad Token', 'Token expired');
 * next(err);
 * ```
 *
 * The error middleware of the app will catch this and
 * return an appropriate error with the error code passed to errorbuilder
 * @param {number} code
 * @param {string} title
 * @param {string} details
 * @param {object} instance
 */
const errorBuilder = (
    code = 500,
    title = "Server Error",
    details = "An unexpected error occured",
    instance
) => {
    const error = new ErrorMessage(code, title);
    error.setDetail(details);
    logger.info(details);
    if (instance) {
        error.setInstance(instance);
    }
    return error;
};

module.exports = errorBuilder;