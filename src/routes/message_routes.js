const { NoContent, Created, BadRequest, Ok } = require("../model/common/model");

const messageService = require("../services/message_service");

const routeMessage = (app) => {
  app.post("/api/message", async (req, res) => {
    const inserted = await messageService.addMessage(req.body, res.cookie.login_token);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/message", async (req, res) => {
    const edited = await messageService.editMessage(req.query.id, req.body, res.cookie.login_token);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/message", async (req, res) => {
    const message = await messageService.getMessageById(req.query.id, res.cookie.login_token);

    if (message == null) return NoContent(res);

    return Ok(res, message);
  });

  app.get("/api/message", async (req, res) => {
    const message = await messageService.getMessagesByPersonId(req.query.id, res.cookie.login_token);

    if (message == null || message.length === 0) return NoContent(res);

    return Ok(res, message);
  });

  app.delete("/api/message", async (req, res) => {
    const deleted = await messageService.deleteMessage(req.query.id, res.cookie.login_token);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

module.exports = routeMessage;
