const mysql = require('../mysql');

module.exports = async (ctx, next) => {
    const dataTable = ['chicken_soup', 'rainbow'];
    const {query} = ctx;
    const queryTable = query.table && dataTable.indexOf(query.table) != -1 ? query.table : 'chicken_soup';
    const queryLimit = query.limit && /^\d{0,5}$/.test(query.limit) ? query.limit : 1;
    const queryType = query.type
    const sql = `SELECT * FROM ${queryTable} ORDER BY RAND() LIMIT ${queryLimit}`
    const resData = await mysql.query(sql);
    resData.map(async item => {
        const hits = Number(item.hits) + 1;
        const updateHits = `UPDATE ${queryTable} SET hits=${hits} WHERE id=${item.id}`;
        await mysql.query(updateHits)
    })
    ctx.body = queryType == 'text' ? resData[0].title : resData;
};
