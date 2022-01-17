const axios = require('axios');
const userApi = 'https://api.github.com/user';
const getTokenUrl = 'https://github.com/login/oauth/access_token';
const clientID = '7999685c3840252ed6b3';
const clienSecret = '';
module.exports = async (ctx, next) => {
  const {query} = ctx;
  const {code} = query;
  if (code) {
    const resToken = await axios({
      method: 'post',
      url: `${getTokenUrl}?client_id=${clientID}&client_secret=${clienSecret}&code=${code}`,
      headers: {
        accept: 'application/json'
      }
    });
    console.log(resToken.data);
    ctx.body = 'resToken';
    const res = await axios({
      method: 'get',
      url: userApi,
      headers: {
        accept: 'application/json',
        Authorization: `token ${resToken.data.access_token}`
      }
    });
    ctx.cookies.set('_token', resToken.data.access_token);
    ctx.response.redirect('/user');
  }
}
