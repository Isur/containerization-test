const { Pool } = require("pg");
const migrate = require("./migration").module;

const databaseConfig = {
  user: "db",
  host: "db",
  database: "db",
  password: "db",
  port: 5432,
};

const pool = Pool(databaseConfig);

migrate(pool).catch(console.error);


exports.module = {
  query: async (query, params) => pool.query(query, params),
};

