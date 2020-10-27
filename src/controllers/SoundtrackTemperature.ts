import { TemperatureService } from "@src/services/temperature";
import { Request, Response } from "express";

class SoundtrackTemperature {
  constructor(private temperatureService = new TemperatureService()) {}

  public async create(req: Request, res: Response): Promise<void> {
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
