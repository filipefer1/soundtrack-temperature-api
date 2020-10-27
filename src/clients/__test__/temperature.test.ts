import { Temperature } from "@src/clients/temperature";

describe("Temperature client", () => {
  it("should return normalized data from temperature service by city name ", async () => {
    const cityname = "Brasília";
    const temperature = new Temperature();
    const response = await temperature.fetchTemperatureByCityName(cityname);
    expect(response).toEqual({});
  });
});
