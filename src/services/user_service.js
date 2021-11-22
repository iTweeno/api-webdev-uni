const userConnector = require("../connector/user_connector");

const addUser = async (body) => {
  const inserted = await userConnector.addUser(body);

  return inserted === 1;
};

const editUser = async (id, body) => {
  const edited = await userConnector.editUser(id, body);

  return edited === 1;
};

const getUser = async (body) => {
  let user;
  if ((body.email != null && body.password != null) || body.id != null) {
    user = await userConnector.getUser(body);
  }

  return user;
};

const deleteUser = async (id) => {
  const deleted = await userConnector.deleteUser(id);

  return deleted === 1;
};

module.exports = { addUser, editUser, getUser, deleteUser };
