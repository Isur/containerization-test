const { Pool } = require("pg");
const migrate = require("./migration").module;

const databaseConfig = {
  user: process.env.DBUSER || "db",
  host: process.env.DBHOST || "db",
  database: process.env.DBNAME || "db",
  password: process.env.DBPASSWORD || "db",
  port: process.env.DBPORT || 5432,
};

const pool = Pool(databaseConfig);

migrate(pool).catch(console.error);


exports.module = {
  query: async (query, params) => pool.query(query, params),
};

