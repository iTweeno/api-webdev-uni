import { NoContent, Created, BadRequest, Ok } from "../model/common/model.js";

import adService from "../services/ad_service.js";

import { isUserAuthorizedOrAdmin } from "../middleware/jwt.js";

const routeAd = (app) => {
  app.post("/api/ad", async (req, res) => {
    const inserted = await adService.addAd(req.body, req.cookies);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/ad", isUserAuthorizedOrAdmin("ad.owner"), async (req, res) => {
    const edited = await adService.editAd(req.query.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/ad", async (req, res) => {
    const ad = await adService.getAd(req.query);

    if (ad == null || ad.length === 0) return NoContent(res);

    return Ok(res, ad);
  });

  app.delete("/api/ad", isUserAuthorizedOrAdmin("ad.owner"), async (req, res) => {
    const deleted = await adService.deleteAd(req.query.id);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeAd;
