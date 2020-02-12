const chalk = require("chalk");
// import { Pool } from "pg";
const { postgresIntervalToString } = require("./typesParser");

const ver = [
  `CREATE TABLE db_ver(
    id INTEGER NOT NULL PRIMARY KEY DEFAULT 88,
    version INTEGER,
    upgraded_on TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT only_one_row CHECK (id = 88)
  );
  INSERT INTO db_ver(version) VALUES(1)
  `, `
    CREATE TABLE users(
      integer SERIAL NOT NULL PRIMARY KEY
    );
  `,
];

const a = async function migrate(pool) {
  let dbVer = 0;
  let age;
  const { rows } = await pool.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'db_ver'
     );
    `);
  if(rows[0].exists) {
    const { rows } = await pool.query(`SELECT version, age(NOW(), upgraded_on) as age FROM db_ver`);
    if(rows.length !== 0) {
      dbVer = rows[0].version;
      age = postgresIntervalToString(rows[0].age, "minutes");
    }
  }
  if(dbVer < ver.length) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(`Upgrading database from version ${chalk.blueBright.bold(`${dbVer}`)} to version ${chalk.blueBright.bold(`${ver.length}`)} . Last update  ${chalk.redBright(`${age}`)} ago.`),
    );

    for(let i = dbVer; i < ver.length; i++) {
      await pool.query(ver[i]);
    }

    await pool.query(`
      UPDATE db_ver
      SET
        version = $1,
        upgraded_on = NOW()
       `, [ver.length]);
  } else {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(`Upgrading database is not needed. Current version: ${chalk.blueBright.bold(`${dbVer}`)}. Last update  ${chalk.redBright(`${age}`)} ago.`),
    );
  }
}

exports.module = a;