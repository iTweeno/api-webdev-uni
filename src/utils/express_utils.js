const express = require("express");

const { json } = require("body-parser");

const routeUser = require("../routes/user_routes");

const routeAd = require("../routes/ad_routes");

const startExpressInstance = async () => {
  const app = express();

  app.use(json());

  routeUser(app);
  routeAd(app);

  app.listen(6000, () => {
    console.log("Server listening on port 6000");
  });
};

module.exports = startExpressInstance;
