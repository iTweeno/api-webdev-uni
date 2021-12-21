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
  if (query.otherId != null && query.adId != null && query.userId != null) {
    message = await messageConnector.getMessagesByPeopleIds(query.adId, query.otherId, query.adId);
  } else if (query.userId != null) {
    message = await messageConnector.getMessagesByPersonId(query.userId);
  }
  return message;
};

const deleteMessage = async (id) => {
  const deleted = await messageConnector.deleteMessage(id);

  return deleted === 1;
};

export default { addMessage, editMessage, getMessageById, deleteMessage, getMessagesByPersonId };
