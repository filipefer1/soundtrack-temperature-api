import { Temperature } from "@src/clients/temperature";
import {
  Coord,
  TemperatureResponseNormalized,
} from "@src/interfaces/temperature";
import { removeAccents } from "@src/util/formatCityName";
import { formatCoord } from "@src/util/formatCoords";
import { InternalError } from "@src/util/errors/internal-error";

export interface cityNameOrCoords {
  cityName?: string;
  coords?: Coord;
}

export class TemperatureInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error during temperature service: ${message}`);
  }
}

export class TemperatureService {
  constructor(protected temperature = new Temperature()) {}

  public async fetchTemperature(
    cityNameOrCoords: cityNameOrCoords
  ): Promise<TemperatureResponseNormalized> {
    const { cityName, coords } = cityNameOrCoords;

    try {
      if (coords) {
        coords.lat = formatCoord(coords.lat);
        coords.lon = formatCoord(coords.lon);
        const temperatureByCoords = await this.temperature.fetchTemperatureByCoords(
          coords.lat,
          coords.lon
        );
        return temperatureByCoords;
      }
      const normalizedCityName = removeAccents(cityName!);
      const temperatureByCityName = await this.temperature.fetchTemperatureByCityName(
        normalizedCityName
      );
      return temperatureByCityName;
    } catch (err) {
      throw new TemperatureInternalError(err.message);
    }
  }
}
