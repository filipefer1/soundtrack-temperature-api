import nock from "nock";
import temperatureResponseFixture from "@test/fixture/temperatureResponseFixture.json";
import soundResponseFixture from "@test/fixture/soundResponseFixture.json";

describe("Soundtrack temperature functional tests", () => {
  describe("When creating a new soundtrack temperature", () => {
    it("should successfully create a new soundtrack temperature", async () => {
      // nock("https://api.openweathermap.org:443", {
      //   encodedQueryParams: true,
      //   reqheaders: {
      //     Authorization: (): boolean => true,
      //   },
      // })
      //   .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      //   .get("/data/2.5/weather")
      //   .query({
      //     q: "Brasilia",
      //     units: "metric",
      //     appid: "b77e07f479efe92156376a8b07640ced",
      //   })
      //   .reply(200, temperatureResponseFixture);

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

      nock("https://api.spotify.com:443", { encodedQueryParams: true })
        .get("/v1/search")
        .query({ q: "genre%3Apop", type: "track", limit: "25", offset: "50" })
        .reply(200, soundResponseFixture, [
          "www-authenticate",
          'Bearer realm="spotify", error="invalid_token", error_description="The access token expired"',
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
