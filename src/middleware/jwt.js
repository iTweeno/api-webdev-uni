import jwt from "jsonwebtoken";

import { Unauthorized } from "../model/common/model.js";

import prisma from "../utils/prisma_utils.js";

const isUserAuthorizedOrAdmin = (routeToId) => {
  const getId = async (req, res, next) => {
    let id;
    if (routeToId === "req.query.userId") {
      id = req.query.userId;
    } else if (routeToId === "req.body.user_reporting") {
      id = req.body.user_reporting;
    } else if (routeToId === "ad.owner") {
      const ad = await prisma.ad.findFirst({
        where: {
          id: req.query.id,
        },
      });
      id = ad.owner;
    }
    try {
      if (req.cookies.access_token == null) {
        return Unauthorized(res);
      }
      const tokenVerif = jwt.verify(req.cookies.access_token, process.env.TOKEN);
      if (tokenVerif.exp === 0) {
        res.clearCookie("access_token");
        return Unauthorized(res);
      }
      if (tokenVerif?.user_id === id || tokenVerif?.user_type === "admin") {
        return next();
      }
      return Unauthorized(res);
    } catch (e) {
      return Unauthorized(res);
    }
  };
  return getId;
};

const isUserAuthorizedOrAdminInArray = (req, res, next) => {
  try {
    if (req.cookies.access_token == null) {
      return Unauthorized(res);
    }
    const tokenVerif = jwt.verify(req.cookies.access_token, process.env.TOKEN);
    if (tokenVerif.exp === 0) {
      res.clearCookie("access_token");
      return Unauthorized(res);
    }
    if ([req.body.messenger, req.body.receiver].includes(tokenVerif?.user_id) || tokenVerif?.user_type === "admin") {
      return next();
    }
    return Unauthorized(res);
  } catch (e) {
    return Unauthorized(res);
  }
};

const isTokenValid = (req, res, next) => {
  try {
    const tokenVerif = jwt.verify(req.cookies.access_token, process.env.TOKEN);
    if (tokenVerif.exp === 0) {
      res.clearCookie("access_token");
      return Unauthorized(res);
    }
    return next();
  } catch (e) {
    return Unauthorized(res);
  }
};

const getTokenId = (token, res) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);
    if (tokenVerif.exp === 0) {
      res.clearCookie("access_token");
      return null;
    }
    return tokenVerif.user_id;
  } catch (e) {
    return null;
  }
};

const isUserAdmin = (req, res, next) => {
  try {
    const tokenVerif = jwt.verify(req.cookies.access_token, process.env.TOKEN);

    if (tokenVerif?.user_type === "admin") {
      return next();
    }
    return Unauthorized(res);
  } catch (e) {
    return Unauthorized(res);
  }
};

export { isUserAuthorizedOrAdmin, isUserAdmin, isTokenValid, getTokenId, isUserAuthorizedOrAdminInArray };
