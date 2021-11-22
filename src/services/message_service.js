const messageConnector = require("../connector/message_connector");

const addMessage = async (body) => {
  const inserted = await messageConnector.addMessage(body);

  return inserted === 1;
};

const editMessage = async (id, body) => {
  const edited = await messageConnector.editMessage(id, body);

  return edited === 1;
};

const getMessageById = async (id) => {
  const message = await messageConnector.getMessageById(id);

  return message;
};

const getMessagesByPersonId = async (id) => {
  const message = await messageConnector.getMessagesByPersonId(id);

  return message;
};

const deleteMessage = async (id) => {
  const deleted = await messageConnector.deleteMessage(id);

  return deleted === 1;
};

module.exports = { addMessage, editMessage, getMessageById, deleteMessage, getMessagesByPersonId };
