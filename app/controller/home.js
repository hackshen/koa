module.exports = async (ctx, next) => {
    // ctx.response.type = 'html';
    // ctx.response.body = os.networkInterfaces();
    const {request} = ctx;
    const {url, method, query, querystring} = request;

    ctx.body = {
        url,
        method,
        query,
        querystring,
        request,
    }
};
