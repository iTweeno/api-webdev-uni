const reportConnector = require("../connector/report_connector");

const addReport = async (body) => {
  const inserted = await reportConnector.addReport(body);

  return inserted === 1;
};

const editReport = async (id, body) => {
  const edited = await reportConnector.editReport(id, body);

  return edited === 1;
};

const getReports = async (query) => {
  let reports;
  if (query.id != null) {
    reports = await reportConnector.getReportById(query.id);
  } else {

    reports = await reportConnector.getAllReports(query.skip);
  }

  return reports;
};

const deleteReport = async (id) => {
  const deleted = await reportConnector.deleteReport(id);

  return deleted === 1;
};

module.exports = { addReport, editReport, getReports, deleteReport };
