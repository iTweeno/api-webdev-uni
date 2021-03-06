import userConnector from "../connector/user_connector.js";
import { getTokenId } from "../middleware/jwt.js";

const addUser = async (body, file) => {
  const inserted = await userConnector.addUser(body, file);

  return inserted === 1;
};

const editUser = async (id, body, file) => {
  const edited = await userConnector.editUser(id, body, file);

  return edited === 1;
};

const getUser = async (id, cookies) => {
  let user = null;

  if (id != null) {
    user = await userConnector.getUser(id);
  } else if (cookies.access_token != null) {
    const idFromToken = getTokenId(cookies.access_token);
    user = await userConnector.getUser(idFromToken);
  }
  return user;
};

const login = async (email, password) => {
  let token = null;

  if (email != null && password != null) {
    token = await userConnector.login(email, password);
  }

  return token;
};

const deleteUser = async (id) => {
  const deleted = await userConnector.deleteUser(id);

  return deleted === 1;
};

export default { addUser, editUser, getUser, deleteUser, login };
