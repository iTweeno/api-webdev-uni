import { NoContent, Created, BadRequest, Ok, Unauthorized } from "../model/common/model.js";

import messageService from "../services/message_service.js";

import { isUserAuthorizedOrAdmin, isUserAdmin } from "../plugins/middleware.js";

const routeMessage = (app) => {
  app.post("/api/message", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookies.access_token, req.body.messenger, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const inserted = await messageService.addMessage(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/message", async (req, res) => {
    const authorized = isUserAdmin(req.cookies.access_token, req.body.messenger, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const edited = await messageService.editMessage(req.query.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/message", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookies.access_token, req.query.id, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const message = await messageService.getMessageById(req.query.id);

    if (message == null) return NoContent(res);

    return Ok(res, message);
  });

  app.get("/api/message/allMessages", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookies.access_token, req.query.id, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const message = await messageService.getMessagesByPersonId(req.query.id);

    if (message == null || message.length === 0) return NoContent(res);

    return Ok(res, message);
  });

  app.delete("/api/message", async (req, res) => {
    const authorized = isUserAdmin(req.cookies.access_token, req.body.user_reporting, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const deleted = await messageService.deleteMessage(req.query.id);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeMessage;
