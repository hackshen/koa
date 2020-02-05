const router = require('koa-router')();
const qrcode = require('./qrcode');
const domain = require('./domain');
const message = require('./message');
const req = require('./req');

router.get('/', req);
router.get('/qrcode', qrcode);
router.get('/domain', domain);
router.post('/domain', domainPost);
router.get('/message', message);

module.exports = router;
