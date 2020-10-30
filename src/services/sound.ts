import { Sound } from "@src/clients/sound";
import { SoundResponseNormalized } from "@src/interfaces/sound";

export interface SoundtrackResponse extends SoundResponseNormalized {
  genre: string;
}

export class SoundService {
  readonly genre = {
    pop: "pop",
    party: "party",
    rock: "rock",
    classical: "classical",
  };

  constructor(protected sound = new Sound()) {}

  public async fetchSoundTrack(
    temperature: number
  ): Promise<SoundtrackResponse> {
    const genre = this.calculateMusicGenre(temperature);
    const soundtrack = await this.sound.processMusicGenreSearch(genre);
    return { ...soundtrack, genre };
  }

  public calculateMusicGenre(temperature: number): string {
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
