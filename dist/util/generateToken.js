"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenerateOAuthToken = void 0;

class GenerateOAuthToken {
  static generateToken(clientId, clientSecret) {
    const token = `${clientId}:${clientSecret}`;
    const tokenBase64 = Buffer.from(token, "utf-8").toString("base64");
    return tokenBase64;
  }

}

exports.GenerateOAuthToken = GenerateOAuthToken;