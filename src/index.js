import startExpressInstance from "./utils/express_utils.js";

(async () => {
  try {
    await startExpressInstance();
    console.log("Started http server");
  } catch (e) {
    console.log("Error Starting the API");
    console.error(e);
  }
})();
