const prisma = require("../utils/prisma_utils");

const addReport = async (body) => {
  try {
    await prisma.report.create({
      data: body,
    });
  } catch (e) {
    return 0;
  }
  return 1;
};

const editReport = async (id, body) => {
  try {
    await prisma.report.update({
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

module.exports = { addReport, editReport, getReportById, deleteReport, getAllReports };
