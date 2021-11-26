import { NoContent, Created, BadRequest, Ok, Unauthorized } from "../model/common/model.js";

import adService from "../services/ad_service.js";

import { isUserAuthorizedOrAdmin } from "../plugins/middleware.js";

import prisma from "../utils/prisma_utils.js";

const routeAd = (app) => {
  app.post("/api/ad", async (req, res) => {
    const inserted = await adService.addAd(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/ad", async (req, res) => {
    const ad = prisma.ad.findFirst({
      where: req.query.id,
    });

    const authorized = isUserAuthorizedOrAdmin(req.cookie.login_token, ad.messenger);

    if (!authorized) {
      return Unauthorized(res);
    }

    const edited = await adService.editAd(req.query.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/ad", async (req, res) => {
    const ad = await adService.getAd(req.body);

    if (ad == null || ad.length === 0) return NoContent(res);

    return Ok(res, ad);
  });

  app.delete("/api/ad", async (req, res) => {
    const ad = prisma.ad.findFirst({
      where: req.query.id,
    });

    const authorized = isUserAuthorizedOrAdmin(req.cookie.login_token, ad.messenger);

    if (!authorized) {
      return Unauthorized(res);
    }

    const deleted = await adService.deleteAd(req.query.id);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeAd;
