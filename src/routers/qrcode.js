const router = require('koa-router')();
const qr = require('qr-image');

module.exports = router.get('/', async (ctx) => {
	const qrCode = ctx.query && ctx.query.data;
	try {
		const img = qr.image(qrCode, {type: 'png', margin: 1});
		ctx.type = 'image/png';
		ctx.body = img;
	} catch (e) {
		ctx.type = 'text/html;charset=utf-8';
		ctx.body = '<h1>404</h1>';
	}
});
