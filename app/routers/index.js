const router = require('koa-router')();
const qrcode = require('../controller/qrcode');
const domain = require('../controller/domain');
const message = require('../controller/message');
const home = require('../controller/home');
const mysql = require('../mysql');
const jsonp = require('../controller/jsonp');
const sourceMap = require('../controller/sourceMap');
const pac = require('../controller/pacfile');
const getToken = require('../controller/getToken');
const wol = require('../controller/wol');


router.get('/lucky', async (ctx, next) => {
    const {query} = ctx;
    const {user_name, alipay_name, amount} = query
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
router.get('/jsonp', jsonp);
router.get('/sourcemap', sourceMap);
router.get('/pac.pac', pac);
router.get('/callback', getToken);
router.get('/wol', wol);




router.get('/time', async (ctx, next) => {
    await ctx.render('time', {
        name: 1590639000000
    })
});

router.get('/user', async (ctx, next) => {
    await ctx.render('user');
});


let OSS = require('ali-oss');
// let client = new OSS({
//     region: 'oss-cn-hangzhou',
//     accessKeyId: '',
//     accessKeySecret: '',
//     bucket: 'hackshen-oss',
// });

// router.get('/test', async (ctx, next) => {
//     let result = await client.list();
//     ctx.body = result.objects;
// });

module.exports = router;
