const {DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT = 3000, PAC_DOMAIN} = process.env;
const config = {
  appPort: APP_PORT,
  pacDomain: PAC_DOMAIN,
  db: {
    "host": DB_HOST,
    "port": DB_PORT,
    "user": DB_USER,
    "password": DB_PWD,
    "database": DB_NAME,
  }
};
module.exports = config;
