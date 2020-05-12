'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // console.log(controller.admin.bb);
  // router.get('/hh', controller.home.index);
  router.get('/', controller.home.index);
  router.get('/message', controller.message.index);
  router.get('/domain', controller.domain.index);

};
