const fs = require('fs');
const Koa = require('koa');
const path = require('path');

const app = new Koa();
const views = require('koa-views');

const config = require('./conf');
const router = require('./routers/index')

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
	extension: 'ejs'
}));

// 设置响应头
app.use(async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "*")
	await next()
});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(config.appPort, () => {
	console.log(`http://localhost:${config.appPort}`)
});
