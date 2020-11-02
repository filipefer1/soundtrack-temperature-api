"use strict";

var dotenv = _interopRequireWildcard(require("dotenv"));

var _server = require("./server");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config();
const pathEnv = `${__dirname}/../.env`;
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