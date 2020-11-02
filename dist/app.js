"use strict";

var _server = require("./server");

var ExitStatus;

(function (ExitStatus) {
  ExitStatus[ExitStatus["Failure"] = 1] = "Failure";
  ExitStatus[ExitStatus["Success"] = 0] = "Success";
})(ExitStatus || (ExitStatus = {}));

process.on("unhandledRejection", (reason, promise) => {
  console.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
  throw reason;
});
process.on("uncaughtException", error => {
  console.error(`App exiting due to an uncaught error: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async () => {
  try {
    const server = new _server.SetupServer();
    await server.init();
    server.start();
    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];

    for (const sig of exitSignals) {
      process.on(sig, async () => {
        try {
          await server.close();
          console.info(`App exited with success`);
          process.exit(ExitStatus.Success);
        } catch (error) {
          console.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
})();