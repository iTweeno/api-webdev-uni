import multer from "multer";
import { NoContent, Created, BadRequest, Ok, NotAcceptable } from "../model/common/model.js";
import userService from "../services/user_service.js";
import { isUserAuthorizedOrAdmin, isTokenValid } from "../middleware/jwt.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static");
  },
});

const uploadImage = multer({ storage, limits: { fieldSize: 50 * 1024 * 1024 } });

const routeUser = (app) => {
  app.post("/api/user", uploadImage.single("profile_picture"), async (req, res) => {
    console.log(req.body);
    const inserted = await userService.addUser(req.body, req.file);

    if (!inserted) return BadRequest(res);

    return Created(res);
  });

  app.patch("/api/user", isUserAuthorizedOrAdmin("req.query.userId"), async (req, res) => {
    const edited = await userService.editUser(req.query.userId, req.body);

    if (!edited) return BadRequest(res);

    return Ok(res, req.body);
  });

  app.get("/api/user", isTokenValid, async (req, res) => {
    const user = await userService.getUser(req.query.userId, req.cookies);

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

  app.delete("/api/user", isUserAuthorizedOrAdmin("req.query.userId"), async (req, res) => {
    const deleted = await userService.deleteUser(req.query.userId, req.cookies.access_token);

    if (!deleted) return NoContent(res);

    return Ok(res);
  });
};

export default routeUser;
