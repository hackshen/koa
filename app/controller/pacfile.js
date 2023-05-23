const config = require('../conf');
const {pacDomain = ''} = config;
const template = (domain, proxy) => {
  return `if (shExpMatch(url, "*.${domain}*") || shExpMatch(url, "*://${domain}*")) return '${proxy}';`
}
const arr = [
  'translate.googleapis.com',
  'google.com',
  'googleapis.com',
  'githubusercontent.com',
  'githubapp.com',
  'github.com',
  'githubassets.com',
  'v2ex.com',
  'codesandbox.io',
  'vercel.com',
];

const outList = () => {
  return `function FindProxyForURL(url, host) {
        ${arr.map(item => template(item, pacDomain)).join('\n')}
    return "DIRECT";
  }`
}
module.exports = async (ctx, next) => {
  ctx.body = outList();
};

