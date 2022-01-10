import prisma from "../utils/prisma_utils.js";

const availableCurrencies = ["€", "$", "£"];

const addAd = async (body) => {
  const adtoAdd = body;
  try {
    adtoAdd.last_time_updated = new Date(Date.now());
    adtoAdd.amount_of_times_visited = 0;
    adtoAdd.premium_until = null;
    adtoAdd.salary = Number(adtoAdd.salary);
    if (!availableCurrencies.includes(adtoAdd.currency)) {
      return 0;
    }
    if (adtoAdd.salary < 0) {
      return 0;
    }
    adtoAdd.premium_until = null;
    await prisma.ad.create({
      data: adtoAdd,
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

const editAd = async (id, body) => {
  const adToEdit = body;
  adToEdit.last_time_updated = new Date(Date.now());
  adToEdit.premium_until = null;
  adToEdit.salary = Number(adToEdit.salary);
  if (!availableCurrencies.includes(adToEdit.currency)) {
    return 0;
  }
  if (adToEdit.salary < 0) {
    return 0;
  }
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
      include: {
        userr: true,
      },
    });
    return query;
  } catch (e) {
    return null;
  }
};

const getAdsByTitle = async (title, skip) => {
  try {
    const count = await prisma.ad.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });
    const query = await prisma.ad.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      skip: Number(skip * 10),
      take: 10,
      include: {
        userr: true,
      },
      orderBy: {
        premium_until: "desc",
      },
    });
    const queryData = {
      count: count.length,
      data: query,
    };
    return queryData;
  } catch (e) {
    return null;
  }
};

const getAdsByOwner = async (ownerId) => {
  try {
    const query = await prisma.ad.findMany({
      where: {
        owner: ownerId,
      },
    });

    return query;
  } catch (e) {
    return null;
  }
};

const incrementNumberOfTimesVisited = async (adId) => {
  try {
    await prisma.ad.update({
      where: {
        id: adId,
      },
      data: { amount_of_times_visited: { increment: 1 } },
    });
    return 1;
  } catch (e) {
    return 0;
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

export default { addAd, editAd, getAdById, getAdsByTitle, deleteAd, getAdsByOwner, incrementNumberOfTimesVisited };
