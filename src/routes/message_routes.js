import { NoContent, Created, BadRequest, Ok } from "../model/common/model.js";

import messageService from "../services/message_service.js";

import { isUserAuthorizedOrAdminInArray, isUserAuthorizedOrAdmin, isUserAdmin } from "../middleware/jwt.js";

const routeMessage = (app) => {
  app.post("/api/message", isUserAuthorizedOrAdminInArray, async (req, res) => {
    const inserted = await messageService.addMessage(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/message", isUserAdmin, async (req, res) => {
    const edited = await messageService.editMessage(req.query.messageId, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/message", isUserAuthorizedOrAdmin("req.query.userId"), async (req, res) => {
    const message = await messageService.getMessageById(req.query.messageId);

    if (message == null) return NoContent(res);

    return Ok(res, message);
  });

  app.get("/api/message/allMessages", isUserAuthorizedOrAdmin("req.query.userId"), async (req, res) => {
    const message = await messageService.getMessagesByPersonId(req.query);

    if (message == null || message.length === 0) return NoContent(res);

    return Ok(res, message);
  });

  app.delete("/api/message", isUserAdmin, async (req, res) => {
    const deleted = await messageService.deleteMessage(req.query.messageId);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeMessage;
