import userConnector from "../connector/user_connector.js";

const addUser = async (body) => {
  const inserted = await userConnector.addUser(body);

  return inserted === 1;
};

const editUser = async (id, body) => {
  const edited = await userConnector.editUser(id, body);

  return edited === 1;
};

const getUser = async (query) => {
  let user = null;

  if (query.id != null) {
    user = await userConnector.getUser(query);
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
