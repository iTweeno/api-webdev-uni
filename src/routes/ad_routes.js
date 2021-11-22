const { NoContent, Created, BadRequest, Ok } = require("../model/common/model");

const adService = require("../services/ad_service");

const routeAd = (app) => {
  app.post("/api/ad", async (req, res) => {
    const inserted = await adService.addAd(req.body, res.cookie.login_token);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/ad", async (req, res) => {
    const edited = await adService.editAd(req.query.id, req.body, res.cookie.login_token);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/ad", async (req, res) => {
    const ad = await adService.getAd(req.body);

    if (ad == null || ad.length === 0) return NoContent(res);

    return Ok(res, ad);
  });

  app.delete("/api/ad", async (req, res) => {
    const deleted = await adService.deleteAd(req.query.id, res.cookie.login_token);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

module.exports = routeAd;
