import { Sound, SoundResponseNormalized } from "@src/clients/sound";

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
  ): Promise<SoundResponseNormalized> {
    const genre = this.calculateMusicGenre(temperature);
    const soundtrack = await this.sound.processMusicGenreSearch(genre);
    return soundtrack;
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
