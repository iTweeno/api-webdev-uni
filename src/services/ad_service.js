import { getTokenId } from "../middleware/jwt.js";

import adConnector from "../connector/ad_connector.js";

const addAd = async (body, cookies) => {
  if (cookies.access_token != null) {
    const bodyParam = body;
    const idFromToken = getTokenId(cookies.access_token);
    bodyParam.id = idFromToken;
    const inserted = await adConnector.addAd(bodyParam);

    return inserted === 1;
  }
  return false;
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
  } else if (query?.owner != null) {
    ad = await adConnector.getAdsByOwner(query.owner);
  } else {
    ad = null;
  }
  return ad;
};

const incrementNumberOfTimesVisited = async (adId) => {
  const incremented = await adConnector.incrementNumberOfTimesVisited(adId);

  return incremented === 1;
};

const deleteAd = async (id) => {
  const deleted = await adConnector.deleteAd(id);

  return deleted === 1;
};

export default { addAd, editAd, getAd, deleteAd, incrementNumberOfTimesVisited };
