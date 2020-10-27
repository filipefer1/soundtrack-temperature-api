import axios from "axios";
import { Temperature } from "@src/clients/temperature";
import temperatureResponseFixture from "./fixture/temperatureResponseFixture.json";
import temperatureResponseNormalizedFixture from "./fixture/temperatureResponseNormalizedFixture.json";

jest.mock("axios");

describe("Temperature client", () => {
  it("should return normalized data from temperature service by city name ", async () => {
    const cityname = "Brasília";

    axios.get = jest
      .fn()
      .mockResolvedValue({ data: temperatureResponseFixture });

    const temperature = new Temperature(axios);
    const response = await temperature.fetchTemperatureByCityName(cityname);
    expect(response).toEqual(temperatureResponseNormalizedFixture);
  });
});
