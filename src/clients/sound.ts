import config, { IConfig } from "config";
import * as HTTP from "@src/util/request";
import GenerateRandomNumber from "@src/util/getRandomNumber";
import { ClientRequestError } from "@src/util/errors/clientRequestError";
import { InternalError } from "@src/util/errors/internal-error";

const soundResourceConfig: IConfig = config.get("App.resources.Sound");

export interface Images {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Artists {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artists[];
  available_markets: Array<string>;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Items {
  album: Album;
  artists: Artists[];
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface SoundResponse {
  tracks: {
    href: string;
    items: Items[];
    limit: number;
    next: string;
    offset: 50;
    previous: string;
    total: 100000;
  };
}

export interface SoundResponseNormalized {
  artists: Array<string>;
  spotify_link: string;
  soundtrack: string;
}

export class SoundResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage = "Unexpected error returned by the Sound service";
    super(`${internalMessage}: ${message}`);
  }
}

export class Sound {
  readonly type = "track";
  readonly limit = 25;

  constructor(protected request = new HTTP.Request()) {}

  public async processMusicGenreSearch(
    genre: string
  ): Promise<SoundResponseNormalized> {
    try {
      const response = await this.request.get<SoundResponse>(
        `${soundResourceConfig.get(
          "apiUrl"
        )}?q=genre:${genre}&type=track&limit=${this.limit}&offset=${50}`,
        {
          headers: {
            Authorization: `Bearer ${soundResourceConfig.get("apiToken")}`,
          },
        }
      );

      return this.normalizedResponse(response.data);
    } catch (err) {
      if (HTTP.Request.isRequestError(err)) {
        throw new SoundResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${
            err.response.status
          }`
        );
      }
      throw new ClientRequestError(err.message);
    }
  }

  private normalizedResponse(
    soundResponse: SoundResponse
  ): SoundResponseNormalized {
    const randomNumber = GenerateRandomNumber.getRandomNumber();
    const itemList = soundResponse.tracks.items[randomNumber];
    const artists: string[] = [];

    for (let artist of itemList.artists) {
      artists.push(artist.name);
    }

    const soundtrack = {
      spotify_link: itemList.external_urls.spotify,
      soundtrack: itemList.name,
      artists,
    };
    return soundtrack;
  }
}
