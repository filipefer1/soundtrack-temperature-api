import { Sound } from "@src/clients/sound";
import * as HTTP from "@src/util/request";
import GenerateRandomNumber from "@src/util/getRandomNumber";
import soundResponseFixture from "@test/fixture/soundResponseFixture.json";
import soundResponseNormalizedFixture from "@test/fixture/soundResponseNormalized.json";

jest.mock("@src/util/request");
jest.mock("@src/util/getRandomNumber");

describe("Sound client", () => {
  const mockedRequest = new HTTP.Request() as jest.Mocked<HTTP.Request>;
  const mockedGenerateRandomNumber = GenerateRandomNumber as jest.Mocked<
    typeof GenerateRandomNumber
  >;

  describe("When realize a music genre search", () => {
    it("should return a normalized track", async () => {
      const genre = "Rock";

      mockedRequest.get.mockResolvedValue({
        data: soundResponseFixture,
      } as HTTP.Response);

      mockedGenerateRandomNumber.getRandomNumber.mockReturnValue(0);

      const sound = new Sound(mockedRequest);
      const soundResponse = await sound.processMusicGenreSearch(genre);
      expect(soundResponse).toEqual(soundResponseNormalizedFixture);
    });
  });
});
