import { createRequire } from "module";
import startExpressInstance from "./utils/express_utils.js";
import seedDatabase from "./databaseSeeding.js";

const require = createRequire(import.meta.url);
const config = require("../config.json");

const app = (async () => {
  try {
    const appValue = await startExpressInstance();
    console.log("Started http server");
    if (!config.dbSeeded) {
      await seedDatabase();
      console.log("Seeded Database");
    }
    return appValue;
  } catch (e) {
    console.log("Error Starting the API");
    console.error(e);
  }
})();

export default app;
