const os = require('os');
const osType = os.type();
const netInfo = os.networkInterfaces();

module.exports = async (ctx, next) => {
    // ctx.response.type = 'html';
    // ctx.response.body = os.networkInterfaces();
    const {request} = ctx;
    const {url, method, query, querystring} = request;
    console.log(netInfo.eth0)
    ctx.body = {
        osType: osType,
        netInfo: netInfo,
        url,
        method,
        query,
        querystring,
        request,
    }
};
