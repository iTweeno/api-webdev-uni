import { NoContent, Created, BadRequest, Ok, Unauthorized } from "../model/common/model.js";

import reportService from "../services/report_service.js";

import { isUserAuthorizedOrAdmin, isUserAdmin } from "../plugins/middleware.js";

const routeReport = (app) => {
  app.post("/api/report", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookies.access_token, req.body.user_reporting, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const inserted = await reportService.addReport(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.get("/api/report", async (req, res) => {
    const authorized = isUserAdmin(req.cookies.access_token, req.query.id, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const report = await reportService.getReports(req.query);

    if (report == null || report.length === 0) return NoContent(res);

    return Ok(res, report);
  });

  app.delete("/api/report", async (req, res) => {
    const authorized = isUserAdmin(req.cookies.access_token, req.query.id, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const deleted = await reportService.deleteReport(req.query.id);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeReport;
