// src/errors/HttpError.js
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

module.exports = HttpError;
