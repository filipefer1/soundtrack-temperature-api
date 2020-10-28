import { TemperatureService } from "@src/services/temperature";
import { SoundService } from "@src/services/sound";
import { Request, Response } from "express";

const temperatureService = new TemperatureService();
const soundService = new SoundService();

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

    const temperatureInfos = await temperatureService.fetchTemperature(
      cityNameOrCoords
    );

    console.log(temperatureInfos);

    const soundtrack = await soundService.fetchSoundTrack(
      temperatureInfos.temp
    );
    console.log(soundtrack);
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
