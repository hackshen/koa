const router = require('koa-router')();
const qrcode = require('../controller/qrcode');
const domain = require('../controller/domain');
const message = require('../controller/message');
const home = require('../controller/home');
const mysql = require('../mysql');

router.get('/:name', async (ctx, next) => {
    const name = ctx.params.name; // 获取请求参数
    const {query} = ctx;
    const insterText = query.content || '';
    const ins = `INSERT INTO node VALUES ('${name}', '${insterText}', 0);`
    const querySQL = `SELECT * FROM node where id='${name}'`
    const insc = await mysql.query(querySQL)
    console.log(insc)
    if (insc.length !== 0) {
        const name = JSON.stringify(insc[0].title)
        await ctx.render('node', {
            name: name
        })
    } else {

        await mysql.query(ins);
        await ctx.render('node', {
            name
        })
    }
    // ctx.response.body = ctx.params;

});

router.get('/', home);
router.get('/qrcode', qrcode);
router.get('/domain', domain);
router.get('/message', message);


module.exports = router;
