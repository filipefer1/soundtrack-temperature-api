describe("Soundtrack temperature functional tests", () => {
  describe("When creating a new soundtrack temperature", () => {
    it("should successfully create a new soundtrack temperature", async () => {
      const { body, status } = await global.testRequest
        .post("/soundtrack")
        .send({
          cityName: "Brasília",
        });

      expect(status).toBe(200);
      expect(body).toEqual({
        cityName: "Brasília",
        coord: {
          lon: -47.93,
          lat: -15.78,
        },
        temperature: 25,
        soundtrack: "pop_music",
      });
    });
  });
});
