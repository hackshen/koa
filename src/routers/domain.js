const router = require('koa-router')();
const domain = require('../ddns');

module.exports = router.get('/', async (ctx, next) => {
	const req = ctx.request;
	if (req.query.data) {
		const reqData = JSON.parse(req.query.data);
		const msg = await domain(reqData);
		ctx.body = msg;
		return;
	}
	let title = 'Domain Update'
	await ctx.render('index', {
		title,
		req
	})
});
