"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connect = async () => {
  return await _mongoose.default.connect(_config.db.URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

exports.connect = connect;

const close = () => {
  return _mongoose.default.connection.close();
};

exports.close = close;