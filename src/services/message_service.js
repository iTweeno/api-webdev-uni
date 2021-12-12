import messageConnector from "../connector/message_connector.js";

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

const getMessagesByPersonId = async (query) => {
  let message = null;
  if (query.otherid != null && query.adId != null) {
    message = await messageConnector.getMessagesByPeopleIds(query.id, query.otherid);
  } else if (query.id != null) {
    message = await messageConnector.getMessagesByPersonId(query.id);
  }
  return message;
};

const deleteMessage = async (id) => {
  const deleted = await messageConnector.deleteMessage(id);

  return deleted === 1;
};

export default { addMessage, editMessage, getMessageById, deleteMessage, getMessagesByPersonId };
