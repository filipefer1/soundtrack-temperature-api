"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupServer = void 0;

var _express = _interopRequireDefault(require("express"));

var _soundtrack = _interopRequireDefault(require("./routes/soundtrack"));

var _apiErrorValidator = require("./middlewares/api-error-validator");

var database = _interopRequireWildcard(require("./database"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetupServer {
  constructor(port = 3333, app = (0, _express.default)()) {
    this.port = port;
    this.app = app;
  }

  async init() {
    this.setupExpress();
    this.setupRoutes();
    this.setupErrorHandlers();
    await this.setupDatabase();
  }

  getApp() {
    return this.app;
  }

  setupExpress() {
    this.app.use(_express.default.json());
  }

  setupRoutes() {
    this.app.use(_soundtrack.default);
  }

  setupErrorHandlers() {
    this.app.use(_apiErrorValidator.apiErrorValidator);
  }

  async setupDatabase() {
    await database.connect();
  }

  start() {
    this.app.listen(process.env.PORT || this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  async close() {
    await database.close();
  }

}

exports.SetupServer = SetupServer;