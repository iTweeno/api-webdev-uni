import express from "express";

import cookieParser from "cookie-parser";

import bodyParser from "body-parser";

import cors from "cors";

import routeUser from "../routes/user_routes.js";

import routeAd from "../routes/ad_routes.js";

import routeMessage from "../routes/message_routes.js";

import routeReport from "../routes/report_routes.js";

const startExpressInstance = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());

  routeUser(app);
  routeAd(app);
  routeMessage(app);
  routeReport(app);

  app.listen(8393, () => {
    console.log("Server listening on port 8393");
  });
  return app;
};

export default startExpressInstance;
