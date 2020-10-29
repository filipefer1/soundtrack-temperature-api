import { OAuthResponse } from "@src/interfaces/oauth";
import { ClientRequestError } from "@src/util/errors/clientRequestError";
import * as HTTP from "@src/util/request";
import axios, { AxiosStatic } from "axios";

export class OAuth {
  constructor(protected request: AxiosStatic = axios) {}

  public async getOAuthToken(token: string): Promise<OAuthResponse> {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    try {
      const response = await this.request.post<OAuthResponse>(
        "https://accounts.spotify.com/api/token",
        params,
        {
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (err) {
      throw new ClientRequestError(err.message);
    }
  }
}
