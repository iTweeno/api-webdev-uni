import prisma from "../utils/prisma_utils.js";

const addAd = async (body) => {
  const adToEdit = body;
  try {
    adToEdit.last_time_updated = new Date(body.last_time_updated);
    await prisma.ad.create({
      data: adToEdit,
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

const editAd = async (id, body) => {
  const adToEdit = body;
  try {
    adToEdit.last_time_updated = new Date(body.last_time_updated);

    await prisma.ad.update({
      where: {
        id,
      },
      data: adToEdit,
    });
    return 1;
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

const deleteAd = async (id) => {
  try {
    await prisma.ad.delete({
      where: {
        id,
      },
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

export default { addAd, editAd, getAdById, getAdsByTitle, deleteAd };
