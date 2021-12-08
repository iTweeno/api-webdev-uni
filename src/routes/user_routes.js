import { NoContent, Created, BadRequest, Ok, Unauthorized, NotAcceptable } from "../model/common/model.js";

import userService from "../services/user_service.js";

import { isUserAuthorizedOrAdmin, isTokenValid } from "../plugins/middleware.js";

const routeUser = (app) => {
  app.post("/api/user", async (req, res) => {
    const inserted = await userService.addUser(req.body);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/user", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookies.access_token, req.query.id, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const edited = await userService.editUser(req.query.id, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/user", async (req, res) => {
    const authorized = isTokenValid(req.cookies.access_token, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const user = await userService.getUser(req.query.id, req.cookies);

    if (user == null) return NoContent(res);

    return Ok(res, user);
  });

  app.post("/api/user/login", async (req, res) => {
    const token = await userService.login(req.body.email, req.body.password);

    if (token == null) return NotAcceptable(res, "Username or password is incorrect");

    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      secure: true,
      sameSite: "None",
    });

    return NoContent(res);
  });

  app.post("/api/user/logout", async (req, res) => {
    res.clearCookie("access_token", {
      secure: true,
      sameSite: "None",
    });

    return NoContent(res);
  });

  app.delete("/api/user", async (req, res) => {
    const authorized = isUserAuthorizedOrAdmin(req.cookies.access_token, req.query.id, res);

    if (!authorized) {
      return Unauthorized(res);
    }

    const deleted = await userService.deleteUser(req.query.id, req.cookies.access_token);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeUser;
