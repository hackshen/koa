const Koa = require('koa');
const Router = require('koa-router');

const App = new Koa();
const router = new Router();

const qr = require('qr-image');
const config = require('./config.js');
const mysql = require('./mysql.js');

router.get('/qrcode', async (ctx) => {
	const qrCode = ctx.query && ctx.query.data;
	try {
		const img = qr.image(qrCode, {type: 'png', margin: 1});
		ctx.type = 'image/png';
		ctx.body = img;
	} catch (e) {
		ctx.type = 'text/html;charset=utf-8';
		ctx.body = '<h1>404</h1>';
	}
})

router.get('/message', async (ctx, next) => {
	const dataTable = ['chicken_soup', 'rainbow'];
	let ctxQuery = ctx.query;
	let queryTable = ctxQuery.table && dataTable.indexOf(ctxQuery.table) != -1 ? ctxQuery.table : 'chicken_soup';
	let queryLimit = ctxQuery.limit && /^\d{0,5}$/.test(ctxQuery.limit) ? ctxQuery.limit : 1;
	let queryType = ctxQuery.type
	let resData = await mysql.query(queryTable, queryLimit);
	ctx.body = queryType == 'text' ? resData[0].title : resData;
});


router.get('/', async (ctx, next) => {
	// ctx.response.type = 'html';
	// ctx.response.body = os.networkInterfaces();
    const req = ctx.request
    const url = req.url // 请求的url
    const method = req.method   // 请求的方法
    const query = req.query // 请求参数
    const querystring = req.querystring // url字符串格式的请求参数
    ctx.body = {
        url,
        method,
        query,
        querystring,
        req,
    }
});

App
	.use(router.routes())
	.use(router.allowedMethods());


App.listen(config.appPort);
