"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.temperature = exports.sound = exports.db = void 0;
const db = {
  URL: process.env.URL || ""
};
exports.db = db;
const sound = {
  CLIENTID: process.env.CLIENTID || "",
  CLIENTSECRET: process.env.CLIENTSECRET || "",
  APIURL: process.env.APIURL || ""
};
exports.sound = sound;
const temperature = {
  TEMPERATURE_API_URL: process.env.TEMPERATURE_API_URL || "",
  TEMPERATURE_API_TOKEN: process.env.TEMPERATURE_API_TOKEN || ""
};
exports.temperature = temperature;