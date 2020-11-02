"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCoord = void 0;

const formatCoord = coord => {
  return Number(coord.toFixed(2));
};

exports.formatCoord = formatCoord;