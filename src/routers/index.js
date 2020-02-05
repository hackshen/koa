const router = require('koa-router')();
const qrcode = require('./qrcode');
const domain = require('./domain');
const message = require('./message');
const req = require('./req');

router.use('/', req.routes(), req.allowedMethods());
router.use('/qrcode', qrcode.routes(), qrcode.allowedMethods());
router.use('/domain', domain.routes(), domain.allowedMethods());
router.use('/message', message.routes(), message.allowedMethods());

module.exports = router;
