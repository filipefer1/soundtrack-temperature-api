export class SoundService {
  readonly genre = {
    pop: "pop",
    party: "party",
    rock: "rock",
    classical: "classical",
  };

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
