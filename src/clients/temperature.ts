import { AxiosStatic } from "axios";
import config, { IConfig } from "config";

const temperatureResourceConfig: IConfig = config.get(
  "App.resources.Temperature"
);

export class Temperature {
  readonly temperatureUnit = "metric";

  constructor(protected request: AxiosStatic) {}

  public async fetchTemperatureByCityName(cityName: string): Promise<{}> {
    return this.request.get(
      `${temperatureResourceConfig.get("apiUrl")}?q=${cityName}&units=${
        this.temperatureUnit
      }&appid=${temperatureResourceConfig.get("apiToken")}`
    );
  }
}
