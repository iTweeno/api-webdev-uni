import reportConnector from "../connector/report_connector.js";

const addReport = async (body) => {
  const inserted = await reportConnector.addReport(body);

  return inserted === 1;
};

const getReports = async (query) => {
  let reports;
  if (query.id != null) {
    reports = await reportConnector.getReportById(query.reportId);
  } else {
    reports = await reportConnector.getAllReports(query.skip);
  }

  return reports;
};

const deleteReport = async (id) => {
  const deleted = await reportConnector.deleteReport(id);

  return deleted === 1;
};

export default { addReport, getReports, deleteReport };
