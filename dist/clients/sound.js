"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sound = exports.SoundResponseError = void 0;

var _config = _interopRequireDefault(require("config"));

var _oauth = require("./oauth");

var HTTP = _interopRequireWildcard(require("../util/request"));

var _generateToken = require("../util/generateToken");

var _getRandomNumber = _interopRequireDefault(require("../util/getRandomNumber"));

var _clientRequestError = require("../util/errors/clientRequestError");

var _internalError = require("../util/errors/internal-error");

var _config2 = require("../util/config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const soundResourceConfig = _config.default.get("App.resources.Sound");

class SoundResponseError extends _internalError.InternalError {
  constructor(message) {
    const internalMessage = "Unexpected error returned by the Sound service";
    super(`${internalMessage}: ${message}`);
  }

}

exports.SoundResponseError = SoundResponseError;

class Sound {
  type = "track";
  limit = 25;

  constructor(request = new HTTP.Request(), oauthRequest = new _oauth.OAuth()) {
    this.request = request;
    this.oauthRequest = oauthRequest;
  }

  async processMusicGenreSearch(genre) {
    try {
      const token = _generateToken.GenerateOAuthToken.generateToken(_config2.CLIENTID, _config2.CLIENTISECRET);

      const oauthToken = await this.oauthRequest.getOAuthToken(token);
      const min = 1;
      const max = 2000;

      const offtest = _getRandomNumber.default.getRandomNumber(min, max);

      const response = await this.request.get(`${soundResourceConfig.get("apiUrl")}?q=genre:${genre}&type=track&limit=${this.limit}&offset=${offtest}`, {
        headers: {
          Authorization: `Bearer ${oauthToken.access_token}`
        }
      });
      return this.normalizedResponse(response.data);
    } catch (err) {
      if (HTTP.Request.isRequestError(err)) {
        throw new SoundResponseError(`Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status}`);
      }

      throw new _clientRequestError.ClientRequestError(err.message);
    }
  }

  normalizedResponse(soundResponse) {
    const min = 0;
    const max = 25;

    const randomNumber = _getRandomNumber.default.getRandomNumber(min, max);

    const itemList = soundResponse.tracks.items[randomNumber];
    const artists = [];

    for (let artist of itemList.artists) {
      artists.push(artist.name);
    }

    const soundtrack = {
      spotify_link: itemList.external_urls.spotify,
      soundtrack: itemList.name,
      artists
    };
    return soundtrack;
  }

}

exports.Sound = Sound;