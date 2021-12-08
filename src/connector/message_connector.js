import prisma from "../utils/prisma_utils.js";

const addMessage = async (body) => {
  const bodyToCreate = body;
  bodyToCreate.sent_at = new Date(Date.now());
  bodyToCreate.edited = false;
  try {
    await prisma.message.create({
      data: bodyToCreate,
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

const editMessage = async (id, body) => {
  const bodyToCreate = body;
  bodyToCreate.sent_at = new Date(Date.now());
  bodyToCreate.edited = false;
  try {
    await prisma.message.update({
      where: {
        id,
      },
      data: bodyToCreate,
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
    const query = await prisma.message.findMany({
      where: {
        OR: [
          {
            messenger: id,
            receiver: id,
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
    await prisma.message.delete({
      where: {
        id,
      },
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

export default { addMessage, editMessage, getMessageById, deleteMessage, getMessagesByPersonId };
