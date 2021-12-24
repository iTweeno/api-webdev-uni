import prisma from "../utils/prisma_utils.js";

const addReport = async (body) => {
  try {
    await prisma.report.create({
      data: body,
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

const getAllReports = async () => {
  try {
    const query = await prisma.report.findMany({});
    return query;
  } catch (e) {
    return null;
  }
};

const deleteReport = async (id) => {
  console.log(id);
  try {
    await prisma.report.delete({
      where: {
        id,
      },
    });
    return 1;
  } catch (e) {
    return 0;
  }
};

export default { addReport, deleteReport, getAllReports };
