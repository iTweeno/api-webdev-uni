const pool = require("../utils/postgres_utils");

const addUser = async (body) => {
  try {
    await pool.query(
      `INSERT INTO userr(first_name, last_name, password, phone_number, email, birthday, join_date, company) VALUES('${body.first_name}', '${body.last_name}', '${body.password}', '${body.phone_number}', '${body.email}', '${body.birthday}', '${body.join_date}', '${body.company}');`
    );
  } catch (e) {
    return 0;
  }
  return 1;
};

const editUser = async (id, body) => {
  try {
    await pool.query(
      `UPDATE userr SET first_name='${body.first_name}', last_name='${body.last_name}', password='${body.password}', phone_number='${body.phone_number}', email='${body.email}', birthday='${body.birthday}', join_date='${body.join_date}', company='${body.company}' WHERE id = '${id}';`
    );
  } catch (e) {
    return 0;
  }
  return 1;
};

const getUserById = async (id) => {
  try {
    const query = await pool.query(`SELECT * FROM userr WHERE id = '${id}';`);

    return query.rows[0];
  } catch (e) {
    return null;
  }
};

const getUserByEmailAndPassword = async (body) => {
  try {
    const query = await pool.query(
      `SELECT * FROM userr WHERE email = '${body.email}' AND password = '${body.password}';`
    );

    return query.rows[0];
  } catch (e) {
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    await pool.query(`DELETE FROM userr WHERE id = '${id}';`);
  } catch (e) {
    return 0;
  }
  return 1;
};

module.exports = { addUser, editUser, getUserById, deleteUser, getUserByEmailAndPassword };
