import reportConnector from "../connector/report_connector.js";

const addReport = async (body) => {
  const inserted = await reportConnector.addReport(body);

  return inserted === 1;
};

const getReports = async () => {
  const reports = await reportConnector.getAllReports();

  return reports;
};

const deleteReport = async (id) => {
  const deleted = await reportConnector.deleteReport(id);

  return deleted === 1;
};

export default { addReport, getReports, deleteReport };
