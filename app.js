const Koa = require('koa');
const Router = require('koa-router');

const App = new Koa();
const router = new Router();
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
    let data = await mysql.query();
    ctx.body = data[0].title;
});


router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>index</h1>';
});

App
    .use(router.routes())
    .use(router.allowedMethods());


App.listen(config.appPort);