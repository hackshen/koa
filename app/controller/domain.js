'use strict';

const Controller = require('egg').Controller;

class DomainController extends Controller {
  async index() {
    const { ctx } = this;
    const req = ctx.query;
    if (req.data) {
      const reqData = JSON.parse(req.data);
      const msg = await ctx.service.ddns.get(reqData);
      ctx.body = msg;
      return;
    }
    const title = 'Hshen';
    await ctx.render('domain', {
      title,
    });
  }
}

module.exports = DomainController;
