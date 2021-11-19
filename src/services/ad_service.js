const adConnector = require("../connector/ad_connector");

const addAd = async (body) => {
  const inserted = await adConnector.addAd(body);

  return inserted === 1;
};

const editAd = async (id, body) => {
  const edited = await adConnector.editAd(id, body);

  return edited === 1;
};

const getAdById = async (id) => {
  const ad = await adConnector.getAdById(id);

  return ad;
};

const getAdByTitle = async (title, limit) => {
  const ad = await adConnector.getAdByTitle(title, limit);

  return ad;
};

const deleteAd = async (id) => {
  const deleted = await adConnector.deleteAd(id);

  return deleted === 1;
};

module.exports = { addAd, editAd, getAdById, getAdByTitle, deleteAd };
