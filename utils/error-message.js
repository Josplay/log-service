/**
 * Universal error messages.
 * Complies with RFC:7807
 * '400': 'Bad Request',
 * '401': 'Unauthorized',
 * '403': 'Forbidden',
 * '404': 'Not Found',
 * '500': 'Internal Server Error',
 */
const httpStatusCodes = require("http").STATUS_CODES;

const HEADERS = {
  "Content-Type": "application/problem+json",
  "Content-Language": "en",
};
const SUPPORTED_STATUS_CODES = [400, 401, 403, 404, 500];
module.exports = class ErrorMessage {
  /**
   *
   * @param {string} type // A URI reference [RFC3986] that identifies the problem type.
   * @param {string} title // A good human readable error title
   */
  constructor(statusCode = 400, title = null) {
    if (statusCode && typeof statusCode !== "number") {
      this.warn = `Expected Status code to be a Number but found ${typeof statusCode}`
    }
    if (statusCode && !SUPPORTED_STATUS_CODES.includes(statusCode)) {
      this.warn = `Unsupported HTTP status code: We currently support the following ${SUPPORTED_STATUS_CODES}.`
    }
    this.headers = HEADERS;
    this.error = {
      warn: this.warn
    };
    this.error.status = Number(statusCode) || 400;
    this.error.title = title || httpStatusCodes[this.error.status];
  }

  /**
   *
   * @param {string} detail // Human readable explanation of this error
   */
  setDetail(detail) {
    this.error.details = detail;
  }

  getDetail() {
    return this.error.details;
  }

  /**
   *
   * @param {*} instance // An instance of this error
   */
  setInstance(instance) {
    this.error.instance = instance;
  }

  getErrorBody() {
    return this.error;
  }

  getHeaders() {
    return this.headers;
  }
};