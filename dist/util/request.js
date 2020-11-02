"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Request {
  constructor(request = _axios.default) {
    this.request = request;
  }

  get(url, config = {}) {
    return this.request.get(url, config);
  }

  post(url, data = {}, config = {}) {
    return this.request.post(url, data, config).then(response => {
      return response.data;
    });
  }

  static isRequestError(error) {
    return !!(error.response && (error.response.status == 429 || error.response.status == 400));
  }

}

exports.Request = Request;