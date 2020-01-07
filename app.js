const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const qr = require('qr-image');

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

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h5>Index</h5>';
});

app
	.use(router.routes())
  .use(router.allowedMethods());


app.listen(3000);
