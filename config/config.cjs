// config/config.cjs
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

module.exports = {
  development: {
    username: 'root',
    password: DB_PASS,
    database: 'bienesraices_database',
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT
  }
};
