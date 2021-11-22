const reportConnector = require("../connector/report_connector");

const addReport = async (body, token) => {
  const inserted = await reportConnector.addReport(body, token);

  return inserted === 1;
};

const getReports = async (query, token) => {
  let reports;
  if (query.id != null) {
    reports = await reportConnector.getReportById(query.id, token);
  } else {
    reports = await reportConnector.getAllReports(query.skip, token);
  }

  return reports;
};

const deleteReport = async (id, token) => {
  const deleted = await reportConnector.deleteReport(id, token);

  return deleted === 1;
};

module.exports = { addReport, getReports, deleteReport };
