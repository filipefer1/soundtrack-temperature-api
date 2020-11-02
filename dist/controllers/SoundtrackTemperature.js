"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _temperature = require("../services/temperature");

var _sound = require("../services/sound");

var _SoundtrackTemperature = require("../models/SoundtrackTemperature");

const temperatureService = new _temperature.TemperatureService();
const soundService = new _sound.SoundService();

class SoundtrackTemperatureController {
  async create(req, res, next) {
    const {
      cityName,
      coords
    } = req.body;

    try {
      if (!cityName && !coords) {
        // tratar esse erro
        throw new Error("coords city name");
      }

      const cityNameOrCoords = {
        cityName: cityName && cityName,
        coords: coords && coords
      };
      const temperatureInfos = await temperatureService.fetchTemperature(cityNameOrCoords);
      const soundtrack = await soundService.fetchSoundTrack(temperatureInfos.temp);
      const soundtrackTemperature = new _SoundtrackTemperature.SoundtrackTemperature({
        soundtrack,
        temperature: temperatureInfos
      });
      const result = await soundtrackTemperature.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async index(req, res, next) {
    try {
      const soundtrackTemperatures = await _SoundtrackTemperature.SoundtrackTemperature.find();

      if (!soundtrackTemperatures) {
        throw new Error("Could not found all soundtracks");
      }

      res.status(200).json(soundtrackTemperatures);
    } catch (err) {
      next(err);
    }
  }

}

var _default = new SoundtrackTemperatureController();

exports.default = _default;