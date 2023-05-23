const udp = require('dgram');
function createMagicPacket(mac) {
  const m = mac.replace(/[^0-9a-fA-F]/g, '');
  const bufMac = Buffer.from(m, 'hex');
  let bufRes = Buffer.alloc(6, 0xff);
  for (let i = 0; i < 16; i++) {
    bufRes = Buffer.concat([bufRes, bufMac]);
  }
  return bufRes;
}

function wakeOnLAN(mac, options) {
  options = Object.assign({
    address: '127.0.0.1',
    port: 0,
  }, options);

  return new Promise((resolve, reject) => {
    const packet = createMagicPacket(mac);

    const socket = udp.createSocket('udp4');

    socket.on('error', (err) => {
      socket.close();
      reject(err);
    });

    socket.send(
      packet,
      0,
      packet.length,
      options.port,
      options.address,
      (err, res) => {
        socket.close();
        if (err) {
          return reject(err);
        }
        resolve(res === packet.length);
      },
    );
  });
}

module.exports = async (ctx, next) => {
    const {query} = ctx;
    const { mac , address, port} = query;
    const res = await wakeOnLAN(mac,{
        address,
        port
    });
    ctx.body = {res,...query}
};
