import config, { IConfig } from "config";
import { OAuth } from "@src/clients/oauth";
import * as HTTP from "@src/util/request";
import { GenerateOAuthToken } from "@src/util/generateToken";
import GenerateRandomNumber from "@src/util/getRandomNumber";
import { ClientRequestError } from "@src/util/errors/clientRequestError";
import { InternalError } from "@src/util/errors/internal-error";
import { SoundResponse, SoundResponseNormalized } from "@src/interfaces/sound";
import { CLIENTID, CLIENTISECRET } from "@src/util/config";

const soundResourceConfig: IConfig = config.get("App.resources.Sound");

export class SoundResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage = "Unexpected error returned by the Sound service";
    super(`${internalMessage}: ${message}`);
  }
}

export class Sound {
  readonly type = "track";
  readonly limit = 25;

  constructor(
    protected request = new HTTP.Request(),
    protected oauthRequest = new OAuth()
  ) {}

  public async processMusicGenreSearch(
    genre: string
  ): Promise<SoundResponseNormalized> {
    try {
      const token = GenerateOAuthToken.generateToken(CLIENTID, CLIENTISECRET);

      const oauthToken = await this.oauthRequest.getOAuthToken(token);

      const min = 1;
      const max = 2000;
      const offtest = GenerateRandomNumber.getRandomNumber(min, max);

      const response = await this.request.get<SoundResponse>(
        `${soundResourceConfig.get(
          "apiUrl"
        )}?q=genre:${genre}&type=track&limit=${this.limit}&offset=${offtest}`,
        {
          headers: {
            Authorization: `Bearer ${oauthToken.access_token}`,
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
    const min = 0;
    const max = 25;
    const randomNumber = GenerateRandomNumber.getRandomNumber(min, max);
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
