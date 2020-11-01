import * as dotenv from "dotenv";
import config, { IConfig } from "config";

const pathEnv = `${__dirname}/../../.env`;

dotenv.config({ path: pathEnv });

const soundResourceConfig: IConfig = config.get("App.resources.Sound");

export const CLIENTID: string =
  process.env.CLIENTID || soundResourceConfig.get("clientId");
export const CLIENTISECRET: string =
  process.env.CLIENTSECRET || soundResourceConfig.get("clientSecret");
