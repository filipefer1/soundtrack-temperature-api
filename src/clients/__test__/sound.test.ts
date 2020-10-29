import { Sound } from "@src/clients/sound";
import * as HTTP from "@src/util/request";
import GenerateRandomNumber from "@src/util/getRandomNumber";
import soundResponseFixture from "@test/fixture/soundResponseFixture.json";
import soundResponseNormalizedFixture from "@test/fixture/soundResponseNormalized.json";
import oauthResponseFixture from "@test/fixture/oauthResponseFixture.json";
import { OAuth } from "@src/clients/oauth";

jest.mock("@src/util/request");
jest.mock("@src/util/getRandomNumber");
jest.mock("@src/clients/oauth");

describe("Sound client", () => {
  const MockedRequestClass = HTTP.Request as jest.Mocked<typeof HTTP.Request>;
  const mockedRequest = new HTTP.Request() as jest.Mocked<HTTP.Request>;
  const mockedOAuth = new OAuth() as jest.Mocked<OAuth>;
  const mockedGenerateRandomNumber = GenerateRandomNumber as jest.Mocked<
    typeof GenerateRandomNumber
  >;

  describe("When realize a music genre search", () => {
    it("should return a normalized track", async () => {
      const genre = "Rock";

      mockedOAuth.getOAuthToken.mockResolvedValue(oauthResponseFixture);

      mockedRequest.get.mockResolvedValue({
        data: soundResponseFixture,
      } as HTTP.Response);

      mockedGenerateRandomNumber.getRandomNumber.mockReturnValue(0);

      const sound = new Sound(mockedRequest, mockedOAuth);
      const soundResponse = await sound.processMusicGenreSearch(genre);
      expect(soundResponse).toEqual(soundResponseNormalizedFixture);
    });

    it("should throw an error if sound service fail before reaching the service", async () => {
      const genre = "any_genre";

      mockedOAuth.getOAuthToken.mockResolvedValue(oauthResponseFixture);
      mockedRequest.get.mockRejectedValue({ message: "Network Error" });

      const sound = new Sound(mockedRequest, mockedOAuth);
      await expect(sound.processMusicGenreSearch(genre)).rejects.toThrow(
        "Unexpected error when trying to communicate to external client: Network Error"
      );
    });

    it("should get a SoundResponseError when the Sound service responds with status code 429 (rate limit)", async () => {
      const genre = "any_genre";

      mockedOAuth.getOAuthToken.mockResolvedValue(oauthResponseFixture);
      MockedRequestClass.isRequestError.mockReturnValue(true);
      mockedRequest.get.mockRejectedValue({
        response: {
          status: 429,
          data: {
            errors: ["Rate limit reached"],
          },
        },
      });

      const sound = new Sound(mockedRequest, mockedOAuth);

      await expect(sound.processMusicGenreSearch(genre)).rejects.toThrow(
        'Unexpected error returned by the Sound service: Error: {"errors":["Rate limit reached"]} Code: 429'
      );
    });
  });
});
