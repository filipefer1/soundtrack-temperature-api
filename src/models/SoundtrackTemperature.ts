import mongoose, { Document, Model } from "mongoose";
import { TemperatureResponseNormalized } from "@src/interfaces/temperature";
import { SoundtrackResponse } from "@src/interfaces/sound";

export interface SoundtrackTemperature {
  soundtrack: SoundtrackResponse;
  temperature: TemperatureResponseNormalized;
}

const schema = new mongoose.Schema(
  {
    soundtrack: {
      spotify_link: {
        type: String,
        required: true,
      },
      soundtrack: {
        type: String,
        required: true,
      },
      artists: [String],
      genre: String,
    },
    temperature: {
      coord: {
        lon: {
          type: Number,
          required: true,
        },
        lat: {
          type: Number,
          required: true,
        },
      },
      temp: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
      },
    },
  }
);

interface SoundtrackTemperatureModel extends Document {}

export const SoundtrackTemperature: Model<SoundtrackTemperatureModel> = mongoose.model(
  "SoundtrackTemperature",
  schema
);
