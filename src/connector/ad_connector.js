const pool = require("../utils/postgres_utils");

const addAd = async (body) => {
  try {
    await pool.query(
      `INSERT INTO ad(type, salary, currency, last_time_updated, amount_of_times_visited, description, title, owner, category, location) VALUES('${body.type}', ${body.salary}, '${body.currency}', '${body.last_time_updated}', ${body.amount_of_times_visited}, '${body.description}', '${body.title}', '${body.owner}', ${body.category}, '${body.location}');`
    );
  } catch (e) {
    return 0;
  }
  return 1;
};

const editAd = async (id, body) => {
  try {
    await pool.query(
      `UPDATE ad SET type='${body.type}', salary=${body.salary}, currency='${body.currency}', last_time_updated='${body.last_time_updated}', amount_of_times_visited=${body.amount_of_times_visited}, description='${body.description}', title='${body.title}', owner='${body.owner}', category=${body.category}, location='${body.location}' WHERE id = '${id}';`
    );
  } catch (e) {
    console.log(e);
    return 0;
  }
  return 1;
};

const getAdById = async (id) => {
  try {
    const query = await pool.query(`SELECT * FROM ad WHERE id = '${id}';`);
    return query.rows[0];
  } catch (e) {
    return null;
  }
};

const getAdByTitle = async (title, limit) => {
  try {
    const query = await pool.query(
      `SELECT * FROM ad WHERE title = '${title}'; LIMIT ${10 * limit} OFFSET ${10 * limit}`
    );

    return query.rows;
  } catch (e) {
    return null;
  }
};

const deleteAd = async (id) => {
  try {
    await pool.query(`DELETE FROM ad WHERE id = '${id}';`);
  } catch (e) {
    return 0;
  }
  return 1;
};

module.exports = { addAd, editAd, getAdById, getAdByTitle, deleteAd };
