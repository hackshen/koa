const router = require('koa-router')();
const qrcode = require('../controller/qrcode');
const domain = require('../controller/domain');
const message = require('../controller/message');
const home = require('../controller/home');
const mysql = require('../mysql');


router.get('/lucky',async(ctx, next)=>{
    const {query} = ctx;
    const {user_name, alipay_name, amount}= query
    if (user_name && alipay_name) {
        const sql = `INSERT INTO hshen VALUES (0,'${user_name}', '${alipay_name}', '${amount}');`
        await mysql.query(sql);
        return ctx.body = 'success';
    }
    const sql = `SELECT * FROM hshen`;
    const data = await mysql.query(sql);
    ctx.body = data;
});

router.get('/', home);
router.get('/qrcode', qrcode);
router.get('/domain', domain);
router.get('/message', message);
router.get('/time', async (ctx, next) => {
    await ctx.render('time', {
        name: 1590639000000
    })
});

module.exports = router;
