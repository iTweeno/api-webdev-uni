import { NoContent, Created, BadRequest, Ok, Unauthorized } from "../model/common/model.js";

import userService from "../services/user_service.js";

import { isUserAuthorizedOrAdmin } from "../plugins/middleware.js";

const routeUser = (app) => {
  app.post("/api/user", async (req, res) => {
    const inserted = await userService.addUser(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/user", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookie.login_token, req.query.id);

    if (!authorized) {
      return Unauthorized(res);
    }

    const edited = await userService.editUser(req.query.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/user", async (req, res) => {
    const user = await userService.getUser(req.query);

    if (user == null) return NoContent(res);

    return Ok(res, user);
  });

  app.get("/api/user/login", async (req, res) => {
    const token = await userService.login(req.query.email, req.query.password);

    if (token == null) return NoContent(res);

    res.cookie("login_token", token);

    return Ok(res, "Logged in");
  });

  app.delete("/api/user", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookie.login_token, req.query.id);

    if (!authorized) {
      return Unauthorized(res);
    }

    const deleted = await userService.deleteUser(req.query.id, req.cookies.login_token);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeUser;
