const router = require('koa-router')();
const qrcode = require('../controller/qrcode');
const domain = require('../controller/domain');
const message = require('../controller/message');
const home = require('../controller/home');
const mysql = require('../mysql');

router.get('/', home);
router.get('/qrcode', qrcode);
router.get('/domain', domain);
router.get('/message', message);
router.get('/node/:name',async (ctx, next)=>{
    const name = ctx.params.name; // 获取请求参数
    const insterText = name;
    const ins = `INSERT INTO node VALUES ('${name}', '${insterText}');`
    const querySQL = `SELECT * FROM node where id='${name}'`
    const insc = await mysql.query(querySQL)
    if (insc.length !== 0) {
        const name = insc[0].title
        await ctx.render('node', {
            name: name
        })
    } else {
        await mysql.query(ins);
        await ctx.render('node', {
            name
        })
    }
})

module.exports = router;
