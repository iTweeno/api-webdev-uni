const prisma = require("../utils/prisma_utils");

const addAd = async (body) => {
  body.last_time_updated = new Date(body.last_time_updated);
  try {
    await prisma.ad.create({
      data: body,
    });
  } catch (e) {
    return 0;
  }
  return 1;
};

const editAd = async (id, body) => {
  body.last_time_updated = new Date(body.last_time_updated);
  try {
    await prisma.ad.update({
      where: {
        id,
      },
      data: body,
    });
  } catch (e) {
    return 0;
  }
  return 1;
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

const deleteAd = async (id) => {
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

module.exports = { addAd, editAd, getAdById, getAdsByTitle, deleteAd };
