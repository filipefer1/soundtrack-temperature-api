import config, { IConfig } from "config";
import { InternalError } from "@src/util/errors/internal-error";
import * as HTTP from "@src/util/request";
import { ClientRequestError } from "@src/util/errors/clientRequestError";
import {
  TemperatureResponse,
  TemperatureResponseNormalized,
} from "@src/interfaces/temperature";

const temperatureResourceConfig: IConfig = config.get(
  "App.resources.Temperature"
);

export class TemperatureResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      "Unexpected error returned by the Temperature service";
    super(`${internalMessage}: ${message}`);
  }
}

export class Temperature {
  readonly temperatureUnit = "metric";

  constructor(protected request = new HTTP.Request()) {}

  public async fetchTemperatureByCityName(
    cityName: string
  ): Promise<TemperatureResponseNormalized> {
    try {
      const response = await this.request.get<TemperatureResponse>(
        `${temperatureResourceConfig.get("apiUrl")}?q=${cityName}&units=${
          this.temperatureUnit
        }&appid=${temperatureResourceConfig.get("apiToken")}`
      );

      return this.normalizeResponse(response.data);
    } catch (err) {
      if (HTTP.Request.isRequestError(err)) {
        throw new TemperatureResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${
            err.response.status
          }`
        );
      }
      throw new ClientRequestError(err.message);
    }
  }

  public async fetchTemperatureByCoords(
    lat: number,
    lon: number
  ): Promise<TemperatureResponseNormalized> {
    try {
      const response = await this.request.get<TemperatureResponse>(
        `${temperatureResourceConfig.get(
          "apiUrl"
        )}?lat=${lat}&lon=${lon}&units=${
          this.temperatureUnit
        }&appid=${temperatureResourceConfig.get("apiToken")}`
      );

      return this.normalizeResponse(response.data);
    } catch (err) {
      if (HTTP.Request.isRequestError(err)) {
        throw new TemperatureResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${
            err.response.status
          }`
        );
      }
      throw new ClientRequestError(err.message);
    }
  }

  private normalizeResponse(
    temperature: TemperatureResponse
  ): TemperatureResponseNormalized {
    const temperatureNormalized = {
      coord: temperature.coord,
      temp: temperature.main.temp,
      name: temperature.name,
    };
    return temperatureNormalized;
  }
}
