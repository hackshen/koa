const router = require('koa-router')();
const qrcode = require('../controller/qrcode');
const domain = require('../controller/domain');
const message = require('../controller/message');
const home = require('../controller/home');

router.get('/', home);
router.get('/qrcode', qrcode);
router.get('/domain', domain);
router.get('/message', message);

module.exports = router;
