"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class GenerateRamdomNumber {
  static getRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
  }

}

exports.default = GenerateRamdomNumber;