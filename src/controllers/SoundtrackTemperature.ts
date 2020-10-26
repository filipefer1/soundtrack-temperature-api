import { Request, Response } from "express";

class SoundtrackTemperature {
  public async create(_: Request, res: Response): Promise<void> {
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
