import { Sound } from "../sound";

describe("Sound client", () => {
  describe("When realize a music genre search", () => {
    it("should return a normalized track", async () => {
      const genre = "Rock";
      const sound = new Sound();
      const soundResponse = await sound.processMusicGenreSearch(genre);
      expect(soundResponse).toEqual({});
    });
  });
});
