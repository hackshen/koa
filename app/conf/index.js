const {host, port, user, password, database, appPort} = process.env;
const config = {
    appPort: appPort,
    db: {
        "host": host,
        "port": port,
        "user": user,
        "password": password,
        "database": database,
    }
};
module.exports = config;
