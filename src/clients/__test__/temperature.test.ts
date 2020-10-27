import axios from "axios";
import { Temperature } from "@src/clients/temperature";
import temperatureResponseFixture from "./fixture/temperatureResponseFixture.json";
import temperatureResponseNormalizedFixture from "./fixture/temperatureResponseNormalizedFixture.json";

jest.mock("axios");

describe("Temperature client", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  describe("When fetch temperature by city name", () => {
    it("should return normalized data from temperature service ", async () => {
      const cityname = "Brasília";

      mockedAxios.get.mockResolvedValue({ data: temperatureResponseFixture });

      const temperature = new Temperature(mockedAxios);
      const response = await temperature.fetchTemperatureByCityName(cityname);
      expect(response).toEqual(temperatureResponseNormalizedFixture);
    });

    it("should get a generic error from Temperature service when the request fail before reaching the service", async () => {
      const cityname = "Brasília";
      mockedAxios.get.mockRejectedValue({ message: "Network Error" });

      const temperature = new Temperature(mockedAxios);

      await expect(
        temperature.fetchTemperatureByCityName(cityname)
      ).rejects.toThrow(
        "Unexpected error when trying to communicate to Temperature client: Network Error"
      );
    });
  });
});
