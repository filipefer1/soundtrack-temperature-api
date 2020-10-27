import { TemperatureService } from "@src/services/temperature";
import temperatureNormalized from "@test/fixture/temperatureResponseNormalizedFixture.json";
import { Temperature } from "@src/clients/temperature";

jest.mock("@src/clients/temperature");

describe("Temperature service", () => {
  const mockedTemperatureClient = new Temperature() as jest.Mocked<Temperature>;

  it("should return the coords and temperature for a city by city name", async () => {
    const cityName = "Brasília";

    mockedTemperatureClient.fetchTemperatureByCityName.mockResolvedValue(
      temperatureNormalized
    );
    const temperatureService = new TemperatureService(mockedTemperatureClient);
    const normalizedTemperature = await temperatureService.fetchTemperature({
      cityName,
    });
    expect(normalizedTemperature).toEqual(temperatureNormalized);
    expect(
      mockedTemperatureClient.fetchTemperatureByCityName
    ).toHaveBeenCalledTimes(1);
    expect(mockedTemperatureClient.fetchTemperatureByCoords).not.toBeCalled();
  });

  it("should return the coords and temperature for a city by coords", async () => {
    const coords = {
      lat: -15.78,
      lon: -47.93,
    };

    mockedTemperatureClient.fetchTemperatureByCoords.mockResolvedValue(
      temperatureNormalized
    );
    const temperatureService = new TemperatureService(mockedTemperatureClient);
    const normalizedTemperature = await temperatureService.fetchTemperature({
      coords,
    });
    expect(normalizedTemperature).toEqual(temperatureNormalized);
    expect(
      mockedTemperatureClient.fetchTemperatureByCoords
    ).toHaveBeenCalledTimes(1);
    expect(mockedTemperatureClient.fetchTemperatureByCityName).not.toBeCalled();
  });

  it("should return the coords and temperature for a city (coords and city name)", async () => {
    const coords = {
      lat: -15.78,
      lon: -47.93,
    };
    const cityName = "Brasília";

    mockedTemperatureClient.fetchTemperatureByCoords.mockResolvedValue(
      temperatureNormalized
    );
    const temperatureService = new TemperatureService(mockedTemperatureClient);
    const normalizedTemperature = await temperatureService.fetchTemperature({
      cityName,
      coords,
    });
    expect(normalizedTemperature).toEqual(temperatureNormalized);
    expect(
      mockedTemperatureClient.fetchTemperatureByCoords
    ).toHaveBeenCalledTimes(1);
    expect(mockedTemperatureClient.fetchTemperatureByCityName).not.toBeCalled();
  });
});
