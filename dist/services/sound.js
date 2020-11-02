"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundService = void 0;

var _sound = require("../clients/sound");

class SoundService {
  genre = {
    pop: "pop",
    party: "party",
    rock: "rock",
    classical: "classical"
  };

  constructor(sound = new _sound.Sound()) {
    this.sound = sound;
  }

  async fetchSoundTrack(temperature) {
    const genre = this.calculateMusicGenre(temperature);
    const soundtrack = await this.sound.processMusicGenreSearch(genre);
    return { ...soundtrack,
      genre
    };
  }

  calculateMusicGenre(temperature) {
    if (temperature < 10) {
      return this.genre.classical;
    }

    if (temperature >= 10 && temperature < 15) {
      return this.genre.rock;
    }

    if (temperature >= 15 && temperature <= 30) {
      return this.genre.pop;
    }

    return this.genre.party;
  }

}

exports.SoundService = SoundService;