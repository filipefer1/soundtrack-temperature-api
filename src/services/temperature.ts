import {
  Coord,
  Temperature,
  TemperatureResponseNormalized,
} from "@src/clients/temperature";
import { removeAccents } from "@src/util/formatCityName";
import { formatCoord } from "@src/util/formatCoords";

export interface cityNameOrCoords {
  cityName?: string;
  coords?: Coord;
}

export class TemperatureService {
  constructor(protected temperature = new Temperature()) {}

  public async fetchTemperature(
    cityNameOrCoords: cityNameOrCoords
  ): Promise<TemperatureResponseNormalized> {
    const { cityName, coords } = cityNameOrCoords;

    if (coords) {
      coords.lat = formatCoord(coords.lat);
      coords.lon = formatCoord(coords.lon);
      return this.temperature.fetchTemperatureByCoords(coords.lat, coords.lon);
    }
    const normalizedCityName = removeAccents(cityName!);
    return this.temperature.fetchTemperatureByCityName(normalizedCityName);
  }
}
