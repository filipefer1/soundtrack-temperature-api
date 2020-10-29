import { OAuth } from "../oauth";
import * as HTTP from "@src/util/request";
import axios from "axios";

import oauthResponseFixture from "../../../test/fixture/oauthResponseFixture.json";

// jest.mock("@src/util/request");
jest.mock("axios");

describe("OAuth client", () => {
  // const mockedRequest = new HTTP.Request() as jest.Mocked<HTTP.Request>;
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  describe("When making a request for client token endpoint", () => {
    it("should return an object with a valid oauth token", async () => {
      const token = "valid_base64_token";
      mockedAxios.post.mockResolvedValue({
        data: oauthResponseFixture,
      } as HTTP.Response);
      const oauth = new OAuth();
      const response = await oauth.getOAuthToken(token);
      expect(response).toEqual(oauthResponseFixture);
    });

    it("shoud throw a clientRequestError if oauth request fails", async () => {
      const token = "valid_base64_token";
      mockedAxios.post.mockRejectedValue({ message: "Network Error" });
      const oauth = new OAuth();

      await expect(oauth.getOAuthToken(token)).rejects.toThrow(
        "Unexpected error when trying to communicate to external client: Network Error"
      );
    });
  });
});
