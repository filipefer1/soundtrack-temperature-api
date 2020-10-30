import { TemperatureService } from "@src/services/temperature";
import { SoundService } from "@src/services/sound";
import { NextFunction, Request, Response } from "express";

const temperatureService = new TemperatureService();
const soundService = new SoundService();

class SoundtrackTemperature {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { cityName, coords } = req.body;

    try {
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

      const soundtrack = await soundService.fetchSoundTrack(
        temperatureInfos.temp
      );

      res.status(201).json({ soundtrack, temperature: temperatureInfos });
    } catch (err) {
      next(err);
    }
  }
}

export default new SoundtrackTemperature();
