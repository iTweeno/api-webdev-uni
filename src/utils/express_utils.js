import express from "express";

import cookieParser from "cookie-parser";

import bodyParser from "body-parser";

import cors from "cors";

import https from "https";

import path from "path";

import fs from "fs";

import session from "express-session";

import routeUser from "../routes/user_routes.js";

import routeAd from "../routes/ad_routes.js";

import routeMessage from "../routes/message_routes.js";

import routeReport from "../routes/report_routes.js";

const startExpressInstance = async () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({ secret: process.env.TOKEN, cookie: { sameSite: "None", secure: true } }));
  app.get("/", (req, res) => {
    return res.json({ data: "It's working" });
  });
  routeUser(app);
  routeAd(app);
  routeMessage(app);
  routeReport(app);

  https
    .createServer(
      {
        key: fs.readFileSync(path.join(process.cwd(), "ssl/ssl.key")),
        cert: fs.readFileSync(path.join(process.cwd(), "ssl/ssl.cert")),
      },
      app
    )
    .listen(8393, () => {
      console.log("Server listening on port 8393");
    });
  return app;
};

export default startExpressInstance;
