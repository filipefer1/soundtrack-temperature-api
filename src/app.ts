import { SetupServer } from "@src/server";

(async () => {
  try {
    const server = new SetupServer();
    await server.init();
    server.start();
  } catch (err) {
    console.error(err);
  }
})();
