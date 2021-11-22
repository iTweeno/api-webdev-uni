const adConnector = require("../connector/ad_connector");

const addAd = async (body) => {
  const inserted = await adConnector.addAd(body);

  return inserted === 1;
};

const editAd = async (id, body) => {
  const edited = await adConnector.editAd(id, body);

  return edited === 1;
};

const getAd = async (body) => {
  let ad;
  if (body?.id != null) {
    ad = await adConnector.getAdById(body.id);
  } else if (body?.title != null && body?.skip != null) {
    ad = await adConnector.getAdsByTitle(body.title, body.skip);
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
