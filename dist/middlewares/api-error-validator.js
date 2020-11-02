"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiErrorValidator = apiErrorValidator;

function apiErrorValidator(error, _, res, __) {
  const errorCode = error.status || 500;
  res.status(errorCode).json({
    code: errorCode,
    message: error.message
  });
}