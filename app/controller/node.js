const mysql = require('../mysql');

module.exports = async (ctx, next) => {
    const id = ctx.params.name;
    const {query} = ctx;
    const {data} = query;
    const insterText = data || id;
    const ins = `INSERT INTO node VALUES ('${id}', '${insterText}')`;
    const querySQL = `SELECT * FROM node where id='${id}'`;
    const insc = await mysql.query(querySQL);
    const updateHits = `UPDATE node SET name=${insterText} WHERE id=${id}`;
    if (insc.length !== 0) {
        let name1 = insc[0].name
        if (data && name1 !== data) {
            await mysql.query(updateHits);
        }
        await ctx.render('node', {
            name: name1
        })

    } else {
        await mysql.query(ins);
        await ctx.render('node', {
            name: id
        })
    }
}
