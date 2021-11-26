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

const getReportById = async (id) => {
  try {
    const query = await prisma.report.findFirst({
      where: {
        id,
      },
    });
    return query;
  } catch (e) {
    return null;
  }
};

const getAllReports = async (skip) => {
  try {
    const query = await prisma.report.findMany({
      take: 10,
      skip: 10 * skip,
    });
    return query;
  } catch (e) {
    return null;
  }
};

const deleteReport = async (id) => {
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

export default { addReport, getReportById, deleteReport, getAllReports };
