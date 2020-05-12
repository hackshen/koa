'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index(ctx) {
    const { app } = this;
    const dataTab = [ 'chicken_soup', 'rainbow' ];
    const reqParams = ctx.query;
    const queryTab = reqParams.table || dataTab[0];
    const qStr = `SELECT * FROM ${queryTab} ORDER BY RAND() LIMIT 1`;
    // ctx.body = await app.mysql.query(qStr);
    await ctx.render('index', {
      msg: 'Hell33o',

    });
  }
}

module.exports = UserController;
