const Koa = require('koa');
const Router = require('koa-router');

const App = new Koa();
const router = new Router();
const fs = require('fs');

const qr = require('qr-image');
const config = require('./config.js');
const mysql = require('./mysql.js');

router.get('/qrcode',async (ctx)=>{
    const qrCode = ctx.query && ctx.query.data;
    try {
        const img = qr.image(qrCode,{type: 'png', margin: 1});
        ctx.type= 'image/png';
        ctx.body = img;
    } catch (e) {
        ctx.type='text/html;charset=utf-8';
        ctx.body='<h1>404</h1>';
    }
})

router.get('/message', async (ctx, next) => {
    const dataTable = ['chicken_soup', 'rainbow'];
    let ctxQuery = ctx.query;
    let queryTable = ctxQuery.table && dataTable.indexOf(ctxQuery.table) != -1 ? ctxQuery.table : 'chicken_soup';
    let queryLimit = ctxQuery.limit && /^\d{0,5}$/.test(ctxQuery.limit) ? ctxQuery.limit : 1;
    console.log(queryTable,3456789)
    let resData = await mysql.query(queryTable, queryLimit);
    ctx.body = resData;
});


router.get('/', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.md');
});

App
    .use(router.routes())
    .use(router.allowedMethods());


App.listen(config.appPort);