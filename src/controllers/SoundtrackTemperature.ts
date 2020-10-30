import { TemperatureService } from "@src/services/temperature";
import { SoundService } from "@src/services/sound";
import { NextFunction, Request, Response } from "express";
import { SoundtrackTemperature } from "@src/models/SoundtrackTemperature";

const temperatureService = new TemperatureService();
const soundService = new SoundService();

class SoundtrackTemperatureController {
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

      const soundtrackTemperature = new SoundtrackTemperature({
        soundtrack,
        temperature: temperatureInfos,
      });

      const result = await soundtrackTemperature.save();

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  public async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const soundtrackTemperatures = await SoundtrackTemperature.find();
      if (!soundtrackTemperatures) {
        throw new Error("Could not found all soundtracks");
      }
      res.status(200).json(soundtrackTemperatures);
    } catch (err) {
      next(err);
    }
  }
}

export default new SoundtrackTemperatureController();
