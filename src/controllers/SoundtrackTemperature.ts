import { TemperatureService } from "@src/services/temperature";
import { Request, Response } from "express";

const temperatureService = new TemperatureService();

class SoundtrackTemperature {
  public async create(req: Request, res: Response): Promise<void> {
    const { cityName, coords } = req.body;

    if (!cityName && !coords) {
      // tratar esse erro
      throw new Error("coords city name");
    }

    const cityNameOrCoords = {
      cityName: cityName && cityName,
      coords: coords && coords,
    };

    const temperature = await temperatureService.fetchTemperature(
      cityNameOrCoords
    );

    console.log(temperature);
    res.send({
      cityName: "Brasília",
      coord: {
        lon: -47.93,
        lat: -15.78,
      },
      temperature: 25,
      soundtrack: "pop_music",
    });
  }
}

export default new SoundtrackTemperature();
