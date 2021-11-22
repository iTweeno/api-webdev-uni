const jwt = require("jsonwebtoken");

const prisma = require("../utils/prisma_utils");

const addAd = async (body, token) => {
  const adToEdit = body;
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === body.owner || tokenVerif.user_type === "admin") {
      adToEdit.last_time_updated = new Date(body.last_time_updated);
      await prisma.ad.create({
        data: adToEdit,
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

const editAd = async (id, body, token) => {
  const adToEdit = body;
  try {
    const ad = prisma.ad.findFirst({
      where: id,
    });
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === ad.owner || tokenVerif.user_type === "admin") {
      adToEdit.last_time_updated = new Date(body.last_time_updated);

      await prisma.ad.update({
        where: {
          id,
        },
        data: adToEdit,
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

const getAdById = async (id) => {
  try {
    const query = await prisma.ad.findFirst({
      where: {
        id,
      },
    });
    return query;
  } catch (e) {
    return null;
  }
};

const getAdsByTitle = async (title, skip) => {
  try {
    const query = await prisma.ad.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      take: 10,
      skip: 10 * skip,
    });
    return query;
  } catch (e) {
    return null;
  }
};

const deleteAd = async (id, token) => {
  try {
    const ad = prisma.ad.findFirst({
      where: id,
    });
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === ad.owner || tokenVerif.user_type === "admin") {
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

module.exports = { addAd, editAd, getAdById, getAdsByTitle, deleteAd };
