const adConnector = require("../connector/ad_connector");

const addAd = async (body) => {
  const inserted = await adConnector.addAd(body);

  return inserted === 1;
};

const editAd = async (id, body) => {
  const edited = await adConnector.editAd(id, body);

  return edited === 1;
};

const getAd = async (query) => {
  let ad;
  if (query?.id != null) {
    ad = await adConnector.getAdById(query.id);
  } else if (query?.title != null && query?.skip != null) {
    ad = await adConnector.getAdsByTitle(query.title, query.skip);
  } else {
    return null;
  }

  return ad;
};

const deleteAd = async (id) => {
  const deleted = await adConnector.deleteAd(id);

  return deleted === 1;
};

module.exports = { addAd, editAd, getAd, deleteAd };
