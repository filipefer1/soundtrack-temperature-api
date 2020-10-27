import axios from "axios";
import { Temperature } from "@src/clients/temperature";
import temperatureResponseFixture from "@test/fixture/temperatureResponseFixture.json";
import temperatureResponseNormalizedFixture from "@test/fixture/temperatureResponseNormalizedFixture.json";
import * as HTTP from "@src/util/request";

jest.mock("@src/util/request");

describe("Temperature client", () => {
  const mockedRequest = new HTTP.Request() as jest.Mocked<HTTP.Request>;
  const MockedRequestClass = HTTP.Request as jest.Mocked<typeof HTTP.Request>;

  describe("When fetch temperature by city name", () => {
    it("should return normalized data from temperature service ", async () => {
      const cityname = "Brasília";

      mockedRequest.get.mockResolvedValue({
        data: temperatureResponseFixture,
      } as HTTP.Response);

      const temperature = new Temperature(mockedRequest);
      const response = await temperature.fetchTemperatureByCityName(cityname);
      expect(response).toEqual(temperatureResponseNormalizedFixture);
    });

    it("should get a generic error from Temperature service when the request fail before reaching the service", async () => {
      const cityname = "Brasília";

      mockedRequest.get.mockRejectedValue({ message: "Network Error" });

      const temperature = new Temperature(mockedRequest);

      await expect(
        temperature.fetchTemperatureByCityName(cityname)
      ).rejects.toThrow(
        "Unexpected error when trying to communicate to Temperature client: Network Error"
      );
    });

    it("should get a TemperatureResponseError when the Temperature service responds with status code 429 (rate limit)", async () => {
      const cityname = "Brasília";

      MockedRequestClass.isRequestError.mockReturnValue(true);
      mockedRequest.get.mockRejectedValue({
        response: {
          status: 429,
          data: {
            errors: ["Rate limit reached"],
          },
        },
      });

      const temperature = new Temperature(mockedRequest);

      await expect(
        temperature.fetchTemperatureByCityName(cityname)
      ).rejects.toThrow(
        'Unexpected error returned by the Temperature service: Error: {"errors":["Rate limit reached"]} Code: 429'
      );
    });

    it("should get a TemperatureResponseError when the Temperature service responds with status code 404 (city not found)", async () => {
      const cityname = "invalid_city_name";

      MockedRequestClass.isRequestError.mockReturnValue(true);
      mockedRequest.get.mockRejectedValue({
        response: {
          status: 404,
          data: {
            errors: ["City not found"],
          },
        },
      });

      const temperature = new Temperature(mockedRequest);

      await expect(
        temperature.fetchTemperatureByCityName(cityname)
      ).rejects.toThrow(
        'Unexpected error returned by the Temperature service: Error: {"errors":["City not found"]} Code: 404'
      );
    });
  });
  describe("When fetch temperature by coords", () => {
    it("should return normalized data from temperature service ", async () => {
      const coords = {
        lat: -15.78,
        lon: -47.93,
      };

      mockedRequest.get.mockResolvedValue({
        data: temperatureResponseFixture,
      } as HTTP.Response);

      const temperature = new Temperature(mockedRequest);
      const response = await temperature.fetchTemperatureByCoords(
        coords.lat,
        coords.lon
      );
      expect(response).toEqual(temperatureResponseNormalizedFixture);
    });

    it("should get a generic error from Temperature service when the request fail before reaching the service", async () => {
      const coords = {
        lat: -15.78,
        lon: -47.93,
      };

      MockedRequestClass.isRequestError.mockReturnValue(false);
      mockedRequest.get.mockRejectedValue({ message: "Network Error" });

      const temperature = new Temperature(mockedRequest);

      await expect(
        temperature.fetchTemperatureByCoords(coords.lat, coords.lon)
      ).rejects.toThrow(
        "Unexpected error when trying to communicate to Temperature client: Network Error"
      );
    });

    it("should get a TemperatureResponseError when the Temperature service responds with status code 429 (rate limit)", async () => {
      const coords = {
        lat: -15.78,
        lon: -47.93,
      };

      MockedRequestClass.isRequestError.mockReturnValue(true);
      mockedRequest.get.mockRejectedValue({
        response: {
          status: 429,
          data: {
            errors: ["Rate limit reached"],
          },
        },
      });

      const temperature = new Temperature(mockedRequest);

      await expect(
        temperature.fetchTemperatureByCoords(coords.lat, coords.lon)
      ).rejects.toThrow(
        'Unexpected error returned by the Temperature service: Error: {"errors":["Rate limit reached"]} Code: 429'
      );
    });

    it("should get a TemperatureResponseError when the Temperature service responds with status code 400 (wrong latitude or longitude)", async () => {
      const coords = {
        lat: -14875.78,
        lon: -47.93,
      };

      MockedRequestClass.isRequestError.mockReturnValue(true);
      mockedRequest.get.mockRejectedValue({
        response: {
          status: 400,
          data: {
            errors: ["Wrong latitude or longitude"],
          },
        },
      });

      const temperature = new Temperature(mockedRequest);

      await expect(
        temperature.fetchTemperatureByCoords(coords.lat, coords.lon)
      ).rejects.toThrow(
        'Unexpected error returned by the Temperature service: Error: {"errors":["Wrong latitude or longitude"]} Code: 400'
      );
    });
  });
});
