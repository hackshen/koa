module.exports = async (ctx, next) => {
	// ctx.response.type = 'html';
	// ctx.response.body = os.networkInterfaces();
	const req = ctx.request;
	const url = req.url; // 请求的url
	const method = req.method;  // 请求的方法
	const query = req.query; // 请求参数
	const querystring = req.querystring; // url字符串格式的请求参数
	ctx.body = {
		url,
		method,
		query,
		querystring,
		req,
	}
};
