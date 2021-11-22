const userConnector = require("../connector/user_connector");

const addUser = async (body) => {
  const inserted = await userConnector.addUser(body);

  return inserted === 1;
};

const editUser = async (id, body, token) => {
  const edited = await userConnector.editUser(id, body, token);

  return edited === 1;
};

const getUser = async (query) => {
  let user = null;
  if (query.id != null) {
    user = await userConnector.getUser(query.id);
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

const deleteUser = async (id, token) => {
  const deleted = await userConnector.deleteUser(id, token);

  return deleted === 1;
};

module.exports = { addUser, editUser, getUser, deleteUser, login };
