import jwt from "jsonwebtoken";

const isUserAuthorizedOrAdmin = (token, id) => {
  const tokenVerif = verify(token, process.env.TOKEN);

  if (tokenVerif?.user_id === id || tokenVerif?.user_type === "admin") {
    return true;
  }
  return false;
};

const isUserAdmin = (token) => {
  const tokenVerif = jwt.verify(token, process.env.TOKEN);

  if (tokenVerif?.user_type === "admin") {
    return true;
  }
  return false;
};

export { isUserAuthorizedOrAdmin, isUserAdmin };
