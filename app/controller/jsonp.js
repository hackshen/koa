module.exports = async (ctx, next) => {
    const {query} = ctx;
    const {callback} = query;
    ctx.body = callback ? `callback('${callback}')` : '请添加query参数callback=xxxx';
};
