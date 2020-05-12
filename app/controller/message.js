'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async index(ctx) {
    const { app } = this;
    const dataTab = [ 'chicken_soup', 'rainbow' ];
    const reqParams = ctx.query;
    const limit = reqParams.limit || 1;
    const queryTab = reqParams.table || dataTab[0];
    const qStr = `SELECT * FROM ${queryTab} ORDER BY RAND() LIMIT ${limit}`;
    ctx.body = await app.mysql.query(qStr);
  }
}

module.exports = MessageController;
