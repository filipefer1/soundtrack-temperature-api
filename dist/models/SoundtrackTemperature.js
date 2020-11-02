"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundtrackTemperature = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.default.Schema({
  soundtrack: {
    spotify_link: {
      type: String,
      required: true
    },
    soundtrack: {
      type: String,
      required: true
    },
    artists: [String],
    genre: String
  },
  temperature: {
    coord: {
      lon: {
        type: Number,
        required: true
      },
      lat: {
        type: Number,
        required: true
      }
    },
    temp: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.updatedAt;
    }
  }
});

const SoundtrackTemperature = _mongoose.default.model("SoundtrackTemperature", schema);

exports.SoundtrackTemperature = SoundtrackTemperature;