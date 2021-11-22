const userConnector = require("../connector/user_connector");

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
  if ((query.email != null && query.password != null) || query.id != null) {
    user = await userConnector.getUser(query);
  }

  return user;
};

const deleteUser = async (id) => {
  const deleted = await userConnector.deleteUser(id);

  return deleted === 1;
};

module.exports = { addUser, editUser, getUser, deleteUser };
