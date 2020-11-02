"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientRequestError = void 0;

var _internalError = require("./internal-error");

class ClientRequestError extends _internalError.InternalError {
  constructor(message) {
    const internalMessage = "Unexpected error when trying to communicate to external client";
    super(`${internalMessage}: ${message}`);
  }

}

exports.ClientRequestError = ClientRequestError;