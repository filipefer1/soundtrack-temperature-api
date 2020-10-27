import { InternalError } from "@src/util/errors/internal-error";
import { AxiosStatic } from "axios";
import config, { IConfig } from "config";

const temperatureResourceConfig: IConfig = config.get(
  "App.resources.Temperature"
);

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface TemperatureResponse {
  readonly coord: Coord;
  readonly weather: Weather;
  readonly base: string;
  readonly main: Main;
  readonly visibility: number;
  readonly wind: Wind;
  readonly clouds: Clouds;
  readonly dt: number;
  readonly sys: Sys;
  readonly timezone: number;
  readonly id: number;
  readonly name: string;
  readonly cod: number;
}

export interface TemperatureResponseNormalized {
  coord: Coord;
  temp: number;
  name: string;
}

export class ClienteRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      "Unexpected error when trying to communicate to Temperature client";
    super(`${internalMessage}: ${message}`);
  }
}

export class TemperatureResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      "Unexpected error returned by the Temperature service";
    super(`${internalMessage}: ${message}`);
  }
}

export class Temperature {
  readonly temperatureUnit = "metric";

  constructor(protected request: AxiosStatic) {}

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
      if (err.response && err.response.status === 429) {
        throw new TemperatureResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${
            err.response.status
          }`
        );
      }
      throw new ClienteRequestError(err.message);
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
