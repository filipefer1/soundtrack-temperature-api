"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = void 0;

var _clientRequestError = require("../util/errors/clientRequestError");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OAuth {
  constructor(request = _axios.default) {
    this.request = request;
  }

  async getOAuthToken(token) {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    try {
      const response = await this.request.post("https://accounts.spotify.com/api/token", params, {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      return response.data;
    } catch (err) {
      throw new _clientRequestError.ClientRequestError(err.message);
    }
  }

}

exports.OAuth = OAuth;