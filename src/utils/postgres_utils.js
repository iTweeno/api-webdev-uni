const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "a",
  port: "5432",
  database: "webDb",
});

module.exports = pool;
