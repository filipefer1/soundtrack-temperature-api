"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemperatureService = exports.TemperatureInternalError = void 0;

var _temperature = require("../clients/temperature");

var _formatCityName = require("../util/formatCityName");

var _formatCoords = require("../util/formatCoords");

var _internalError = require("../util/errors/internal-error");

class TemperatureInternalError extends _internalError.InternalError {
  constructor(message) {
    super(`Unexpected error during temperature service: ${message}`);
  }

}

exports.TemperatureInternalError = TemperatureInternalError;

class TemperatureService {
  constructor(temperature = new _temperature.Temperature()) {
    this.temperature = temperature;
  }

  async fetchTemperature(cityNameOrCoords) {
    const {
      cityName,
      coords
    } = cityNameOrCoords;

    try {
      if (coords) {
        coords.lat = (0, _formatCoords.formatCoord)(coords.lat);
        coords.lon = (0, _formatCoords.formatCoord)(coords.lon);
        const temperatureByCoords = await this.temperature.fetchTemperatureByCoords(coords.lat, coords.lon);
        return temperatureByCoords;
      }

      const normalizedCityName = (0, _formatCityName.removeAccents)(cityName);
      const temperatureByCityName = await this.temperature.fetchTemperatureByCityName(normalizedCityName);
      return temperatureByCityName;
    } catch (err) {
      throw new TemperatureInternalError(err.message);
    }
  }

}

exports.TemperatureService = TemperatureService;