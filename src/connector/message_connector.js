const jwt = require("jsonwebtoken");

const prisma = require("../utils/prisma_utils");

const addMessage = async (body, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === body.ad_contacter || tokenVerif.user_type === "admin") {
      await prisma.message.create({
        data: body,
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

const editMessage = async (id, body, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === id || tokenVerif.user_type === "admin") {
      await prisma.message.update({
        where: {
          id,
        },
        data: body,
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

const getMessageById = async (id, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === id || tokenVerif.user_type === "admin") {
      const query = await prisma.message.findFirst({
        where: {
          id,
        },
      });
      return query;
    }
    return 2;
  } catch (e) {
    return null;
  }
};

const deleteMessage = async (id, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_type === "admin") {
      await prisma.ad.delete({
        where: {
          id,
        },
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

module.exports = { addMessage, editMessage, getMessageById, deleteMessage };
