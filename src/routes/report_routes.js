const { NoContent, Created, BadRequest, Ok } = require("../model/common/model");

const reportService = require("../services/report_service");

const routeReport = (app) => {
  app.post("/api/report", async (req, res) => {
    const inserted = await reportService.addReport(req.body, req.cookie.login_token);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.get("/api/report", async (req, res) => {
    const report = await reportService.getReports(req.query, req.cookie.login_token);

    if (report == null || report.length === 0) return NoContent(res);

    return Ok(res, report);
  });

  app.delete("/api/report", async (req, res) => {
    const deleted = await reportService.deleteReport(req.query.id, req.cookie.login_token);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

module.exports = routeReport;
