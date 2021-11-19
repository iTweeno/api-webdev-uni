const userConnector = require("../connector/user_connector");

const addUser = async (body) => {
  const inserted = await userConnector.addUser(body);

  return inserted === 1;
};

const editUser = async (id, body) => {
  const edited = await userConnector.editUser(id, body);

  return edited === 1;
};

const getUserById = async (id) => {
  const user = await userConnector.getUserById(id);

  return user;
};

const getUserByEmailAndPassword = async (body) => {
  const user = await userConnector.getUserByEmailAndPassword(body);

  return user;
};

const deleteUser = async (id) => {
  const deleted = await userConnector.deleteUser(id);

  return deleted === 1;
};

module.exports = { addUser, editUser, getUserById, deleteUser, getUserByEmailAndPassword };
