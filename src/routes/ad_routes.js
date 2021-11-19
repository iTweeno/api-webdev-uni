const { NoContent, Created, BadRequest, Ok } = require("../model/common/model");

const adService = require("../services/ad_service");

const routeAd = (app) => {
  app.post("/api/ad/", async (req, res) => {
    const inserted = await adService.addAd(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/ad/:id", async (req, res) => {
    const edited = await adService.editAd(req.params.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/ad/:id", async (req, res) => {
    const ad = await adService.getAdById(req.params.id);

    if (ad == null) return NoContent(res);

    return Ok(res, ad);
  });

  app.get("/api/ad/", async (req, res) => {
    const ad = await adService.getAdByTitle(req.body.title, req.body.limit);

    if (ad == null || ad.length === 0) return NoContent(res);

    return Ok(res, ad);
  });

  app.delete("/api/ad/:id", async (req, res) => {
    const deleted = await adService.deleteAd(req.params.id);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

module.exports = routeAd;
