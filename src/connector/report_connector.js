const jwt = require("jsonwebtoken");

const prisma = require("../utils/prisma_utils");

const addReport = async (body, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_id === body.user_reporting || tokenVerif.user_type === "admin") {
      await prisma.report.create({
        data: body,
      });
      return 1;
    }
    return 2;
  } catch (e) {
    return 0;
  }
};

const getReportById = async (id, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_type === "admin") {
      const query = await prisma.report.findFirst({
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

const getAllReports = async (skip, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_type === "admin") {
      const query = await prisma.report.findMany({
        take: 10,
        skip: 10 * skip,
      });
      return query;
    }
    return 2;
  } catch (e) {
    return null;
  }
};

const deleteReport = async (id, token) => {
  try {
    const tokenVerif = jwt.verify(token, process.env.TOKEN);

    if (tokenVerif.user_type === "admin") {
      await prisma.report.delete({
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

module.exports = { addReport, getReportById, deleteReport, getAllReports };
