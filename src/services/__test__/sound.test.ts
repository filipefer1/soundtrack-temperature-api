import { SoundService } from "../sound";
import { Sound } from "@src/clients/sound";
import soundResponseNormalized from "@test/fixture/soundResponseNormalized.json";

jest.mock("@src/clients/sound");

describe("Sound service", () => {
  describe("When testing fetchSoundTrack", () => {
    const mockedSoundClient = new Sound() as jest.Mocked<Sound>;

    it("should return a soundtrack from the sound client", async () => {
      const temperature = 25;
      mockedSoundClient.processMusicGenreSearch.mockResolvedValue(
        soundResponseNormalized
      );
      const soundService = new SoundService(mockedSoundClient);
      const soundtrack = await soundService.fetchSoundTrack(temperature);

      expect(soundtrack).toEqual(soundResponseNormalized);
      expect(mockedSoundClient.processMusicGenreSearch).toHaveBeenCalledTimes(
        1
      );
    });
  });
  describe("When testing calculateMusicGenre", () => {
    it("should return a valid genre base on temperature", () => {
      const temperature = 25;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toBeDefined();
    });

    it("should get a pop genre for a 23º temperature", () => {
      const temperature = 23;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("pop");
    });

    it("should get a pop genre for a 15º temperature", () => {
      const temperature = 15;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("pop");
    });

    it("should get a pop genre for a 30º temperature", () => {
      const temperature = 30;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("pop");
    });

    it("should get a party genre for a 31º temperature", () => {
      const temperature = 31;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("party");
    });

    it("should get a rock genre for a 14º temperature", () => {
      const temperature = 14;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("rock");
    });
    it("should get a rock genre for a 14.9º temperature", () => {
      const temperature = 14.9;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("rock");
    });

    it("should get a rock genre for a 10º temperature", () => {
      const temperature = 10;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("rock");
    });

    it("should get a classical genre for a 0º temperature", () => {
      const temperature = 0;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("classical");
    });

    it("should get a classical genre for a -15º temperature", () => {
      const temperature = -15;
      const soundService = new SoundService();
      const genre = soundService.calculateMusicGenre(temperature);
      expect(genre).toEqual("classical");
    });
  });
});
