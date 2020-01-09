const mysql = require('mysql');
const config = require('./config.js');
const pool  = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	port:config.db.port,
	password: config.db.password,
	database: config.db.database,
});

class Mysql {
	constructor() {

	}

	query(table, limit){
		return new Promise((resolve, reject)=>{
			pool.getConnection(function(err, connection) {
				if (err) {
				    console.log(err)
				}else {
					connection.query(`SELECT * FROM ${table} ORDER BY RAND() LIMIT ${limit}`,  (error, results, fields) => {
						resolve(results)
						// 结束会话
						connection.release();
						// 如果有错误就抛出
						if (error) throw error;
					})
				}
			})
		})
	}
}

module.exports = new Mysql();
