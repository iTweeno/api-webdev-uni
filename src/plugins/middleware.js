import jwt from "jsonwebtoken";

const isUserAuthorizedOrAdmin = (token, id, res) => {
  try {
    if (token == null) {
      return false;
    }
    const tokenVerif = jwt.verify(token, process.env.TOKEN);
    if (tokenVerif.exp === 0) {
      res.clearCookie("access_token");
      return false;
    }
    if (tokenVerif?.user_id === id || tokenVerif?.user_type === "admin") {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

const isTokenValid = (token, res) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);
    if (tokenVerif.exp === 0) {
      res.clearCookie("access_token");
      return false;
    }
    return true;
  } catch (e) {
    return false;
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

const isUserAdmin = (token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif?.user_type === "admin") {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export { isUserAuthorizedOrAdmin, isUserAdmin, isTokenValid, getTokenId };
