const { NoContent, Created, BadRequest, Ok } = require("../model/common/model");

const messageService = require("../services/message_service");

const routeMessage = (app) => {
  app.post("/api/message", async (req, res) => {
    const inserted = await messageService.addMessage(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/message/:id", async (req, res) => {
    const edited = await messageService.editMessage(req.params.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/message/:id", async (req, res) => {
    const message = await messageService.getMessageById(req.params.id);

    if (message == null) return NoContent(res);

    return Ok(res, message);
  });

  app.get("/api/message", async (req, res) => {
    const message = await messageService.getMessagesByPersonId(req.params.id);

    if (message == null || message.length === 0) return NoContent(res);

    return Ok(res, message);
  });

  app.delete("/api/message/:id", async (req, res) => {
    const deleted = await messageService.deleteMessage(req.params.id);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

module.exports = routeMessage;
