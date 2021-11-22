const pool = require("../utils/prisma_utils");

const addMessage = async (body) => {
  try {
    await prisma.message.create({
      data: body,
    });
  } catch (e) {
    return 0;
  }
  return 1;
};

const editMessage = async (id, body) => {
  try {
    await prisma.message.update({
      where: {
        id,
      },
      data: body,
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

const getMessageById = async (id) => {
  try {
    const query = await prisma.message.findFirst({
      where: {
        id,
      },
    });
    return query;
  } catch (e) {
    return null;
  }
};

const getMessagesByPersonId = async (id) => {
  try {
    const query = await prisma.ad.findMany({
      where: {
        OR: [
          {
            owner_id: id,
          },
          {
            ad_contacter: id,
          },
        ],
      },
    });
    return query;
  } catch (e) {
    return null;
  }
};

const deleteMessage = async (id) => {
  try {
    await prisma.ad.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    return 0;
  }
  return 1;
};

module.exports = { addMessage, editMessage, getMessageById, getMessagesByPersonId, deleteMessage };
