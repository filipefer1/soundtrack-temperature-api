import nock from "nock";
import temperatureResponseFixture from "@test/fixture/temperatureResponseFixture.json";
import soundResponseFixture from "@test/fixture/soundResponseFixture.json";
import oauthResponseFixture from "@test/fixture/oauthResponseFixture.json";

jest.setTimeout(30000);

describe("Soundtrack temperature functional tests", () => {
  describe("When creating a new soundtrack temperature", () => {
    it("should successfully create a new soundtrack temperature", async () => {
      nock("http://api.openweathermap.org:80", {
        encodedQueryParams: true,
      })
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .persist()
        .get("/v2/weather/point")
        .query({
          q: "Brasilia",
          units: "metric",
          appid: "b77e07f479efe92156376a8b07640ced",
        })
        .reply(200, temperatureResponseFixture);

      nock("https://accounts.spotify.com:443", {
        encodedQueryParams: true,
        reqheaders: {
          Authorization: (): boolean => true,
        },
      })
        .post("/api/token", "grant_type=client_credentials")
        .reply(200, oauthResponseFixture, [
          "date",
          "Thu, 29 Oct 2020 17:54:30 GMT",
          "content-type",
          "application/json",
          "Content-Length",
          "63",
          "set-cookie",
          "__Host-device_id=AQAkzMjxmHL3Gu-oOJzgAn1fi0rykrKr8D7vEvR34Nc06VfQNtJvDtvg-Jrv388xzBg_T8zLSRtMYh1vDF4KgWEzybTJhXAA_Pg;Version=1;Path=/;Max-Age=2147483647;Secure;HttpOnly;SameSite=Lax",
          "sp-trace-id",
          "7ac50500be381fec",
          "strict-transport-security",
          "max-age=31536000",
          "x-content-type-options",
          "nosniff",
          "vary",
          "Accept-Encoding",
          "server",
          "envoy",
          "Via",
          "HTTP/2 edgeproxy, 1.1 google",
          "Alt-Svc",
          "clear",
          "Connection",
          "close",
        ]);

      nock("https://api.spotify.com:443", {
        allowUnmocked: true,
        encodedQueryParams: true,
        reqheaders: {
          Authorization: (): boolean => true,
        },
      })
        .get("/v1/search")
        .query({ q: "genre%3Apop", type: "track", limit: "25", offset: "50" })
        .reply(200, soundResponseFixture, [
          "www-authenticate",
          'Bearer realm="spotify"',
          "access-control-allow-origin",
          "*",
          "access-control-allow-headers",
          "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token",
          "access-control-allow-methods",
          "GET, POST, OPTIONS, PUT, DELETE, PATCH",
          "access-control-allow-credentials",
          "true",
          "access-control-max-age",
          "604800",
          "content-type",
          "application/json",
          "Content-Length",
          "81",
        ]);

      const { body, status } = await global.testRequest
        .post("/soundtrack")
        .send({
          cityName: "Brasília",
        });

      expect(status).toBe(201);
      expect(body).toBeDefined();
    });
  });
});
