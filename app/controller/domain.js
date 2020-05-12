const domain = require('../service/index');

module.exports = async (ctx, next) => {
	const {request} = ctx;
	if (request.query.data) {
		const requestData = JSON.parse(request.query.data);
		const msg = await domain(requestData);
		ctx.body = msg;
		return;
	}
	let title = 'Domain Update'
	await ctx.render('index', {
		title,
        request
	})
};

