const express = require("express");

const { json } = require("body-parser");

const routeUser = require("../routes/user_routes");

const routeAd = require("../routes/ad_routes");

const routeMessage = require("../routes/message_routes");
const routeReport = require("../routes/report_routes");

const startExpressInstance = async () => {
  const app = express();

  app.use(json());

  routeUser(app);
  routeAd(app);
  routeMessage(app);
  routeReport(app);

  app.listen(420, () => {
    console.log("Server listening on port 420");
  });
};

module.exports = startExpressInstance;
