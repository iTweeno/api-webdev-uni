import prisma from "../utils/prisma_utils.js";

const addAd = async (body) => {
  const adtoAdd = body;
  try {
    adtoAdd.last_time_updated = new Date(Date.now());
    adtoAdd.amount_of_times_visited = 0;
    adtoAdd.premium_until = null;
    adtoAdd.salary = Number(adtoAdd.salary);
    await prisma.ad.create({
      data: adtoAdd,
    });
    return 1;
  } catch (e) {
    console.log(adtoAdd);
    console.log(e);
    return 0;
  }
};

const editAd = async (id, body) => {
  const adToEdit = body;
  try {
    adToEdit.last_time_updated = new Date(Date.now());

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
          mode: "insensitive",
        },
      },
      skip: Number(skip),
      take: 10,
    });

    return query;
  } catch (e) {
    return null;
  }
};

const getAdsByOwner = async (ownerId) => {
  try {
    const query = await prisma.ad.findMany({
      where: {
        owner_id: ownerId,
      },
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

export default { addAd, editAd, getAdById, getAdsByTitle, deleteAd, getAdsByOwner };
