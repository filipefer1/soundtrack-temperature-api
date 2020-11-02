"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Temperature = exports.TemperatureResponseError = void 0;

var _config = _interopRequireDefault(require("config"));

var _internalError = require("../util/errors/internal-error");

var HTTP = _interopRequireWildcard(require("../util/request"));

var _clientRequestError = require("../util/errors/clientRequestError");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const temperatureResourceConfig = _config.default.get("App.resources.Temperature");

class TemperatureResponseError extends _internalError.InternalError {
  constructor(message) {
    const internalMessage = "Unexpected error returned by the Temperature service";
    super(`${internalMessage}: ${message}`);
  }

}

exports.TemperatureResponseError = TemperatureResponseError;

class Temperature {
  temperatureUnit = "metric";

  constructor(request = new HTTP.Request()) {
    this.request = request;
  }

  async fetchTemperatureByCityName(cityName) {
    try {
      const response = await this.request.get(`${temperatureResourceConfig.get("apiUrl")}?q=${cityName}&units=${this.temperatureUnit}&appid=${temperatureResourceConfig.get("apiToken")}`);
      return this.normalizeResponse(response.data);
    } catch (err) {
      if (HTTP.Request.isRequestError(err)) {
        throw new TemperatureResponseError(`Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status}`);
      }

      throw new _clientRequestError.ClientRequestError(err.message);
    }
  }

  async fetchTemperatureByCoords(lat, lon) {
    try {
      const response = await this.request.get(`${temperatureResourceConfig.get("apiUrl")}?lat=${lat}&lon=${lon}&units=${this.temperatureUnit}&appid=${temperatureResourceConfig.get("apiToken")}`);
      return this.normalizeResponse(response.data);
    } catch (err) {
      if (HTTP.Request.isRequestError(err)) {
        throw new TemperatureResponseError(`Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status}`);
      }

      throw new _clientRequestError.ClientRequestError(err.message);
    }
  }

  normalizeResponse(temperature) {
    const temperatureNormalized = {
      coord: temperature.coord,
      temp: temperature.main.temp,
      name: temperature.name
    };
    return temperatureNormalized;
  }

}

exports.Temperature = Temperature;