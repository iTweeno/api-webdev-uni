const { NoContent, Created, BadRequest, Ok } = require("../model/common/model");

const userService = require("../services/user_service");

const routeUser = (app) => {
  app.post("/api/user/", async (req, res) => {
    const inserted = await userService.addUser(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/user/:id", async (req, res) => {
    const edited = await userService.editUser(req.params.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/user", async (req, res) => {
    const user = await userService.getUser(req.body);

    if (user == null) return NoContent(res);

    return Ok(res, user);
  });

  app.delete("/api/user/:id", async (req, res) => {
    const deleted = await userService.deleteUser(req.params.id);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

module.exports = routeUser;
