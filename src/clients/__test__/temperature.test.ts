import { Temperature } from "@src/clients/temperature";
import axios from "axios";

jest.mock("axios");

describe("Temperature client", () => {
  it("should return normalized data from temperature service by city name ", async () => {
    const cityname = "Brasília";

    axios.get = jest.fn().mockResolvedValue({});

    const temperature = new Temperature(axios);
    const response = await temperature.fetchTemperatureByCityName(cityname);
    expect(response).toEqual({});
  });
});
