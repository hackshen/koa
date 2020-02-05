const mysql = require('../mysql');

module.exports = async (ctx, next) => {
	const dataTable = ['chicken_soup', 'rainbow'];
	let ctxQuery = ctx.query;
	let queryTable = ctxQuery.table && dataTable.indexOf(ctxQuery.table) != -1 ? ctxQuery.table : 'chicken_soup';
	let queryLimit = ctxQuery.limit && /^\d{0,5}$/.test(ctxQuery.limit) ? ctxQuery.limit : 1;
	let queryType = ctxQuery.type
	let sql = `SELECT * FROM ${queryTable} ORDER BY RAND() LIMIT ${queryLimit}`
	let resData = await mysql.query(sql);
	ctx.body = queryType == 'text' ? resData[0].title : resData;
};
