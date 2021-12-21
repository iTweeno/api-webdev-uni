import { NoContent, Created, BadRequest, Ok } from "../model/common/model.js";

import reportService from "../services/report_service.js";

import { isUserAuthorizedOrAdmin, isUserAdmin } from "../middleware/jwt.js";

const routeReport = (app) => {
  app.post("/api/report", isUserAuthorizedOrAdmin("req.body.user_reporting"), async (req, res) => {
    const inserted = await reportService.addReport(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.get("/api/report", isUserAdmin, async (req, res) => {
    const report = await reportService.getReports(req.query);

    if (report == null || report.length === 0) return NoContent(res);

    return Ok(res, report);
  });

  app.delete("/api/report", isUserAdmin, async (req, res) => {
    const deleted = await reportService.deleteReport(req.query.reportId);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeReport;
