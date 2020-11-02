"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SoundtrackTemperature = _interopRequireDefault(require("../controllers/SoundtrackTemperature"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post("/soundtrack", _SoundtrackTemperature.default.create);
router.get("/soundtrack", _SoundtrackTemperature.default.index);
var _default = router;
exports.default = _default;