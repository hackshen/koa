const udp = require('dgram');
const wakeOnLAN = (mac, options) => {
  const { address, port } = {
    address: '192.168.66.130',
    port: 9,
    ...options,
  };
  const magicPacket = Mac => {
    const macFormat = Mac.replaceAll('-', '');
    const bufMac = Buffer.from(macFormat, 'hex');
    const bufFirst = Buffer.alloc(6, 0xff);
    return Buffer.concat([bufFirst, Buffer.alloc(16 * bufMac.length, bufMac)]);
  };
  return new Promise((resolve, reject) => {
    const packet = magicPacket(mac);
    const socket = udp.createSocket('udp4');
    socket.on('error', (err) => {
      socket.close();
      reject(err);
    });

    socket.send(
      packet,
      port,
      address,
      (err, res) => {
        socket.close();
        if (err) {
          return reject(err);
        }
        resolve(res === packet.length);
      },
    );
  });
};


module.exports = async (ctx, next) => {
    const {query} = ctx;
    const { mac , address, port} = query;
    const res = await wakeOnLAN(mac,{
        address,
        port
    });
    ctx.body = {res,...query}
};
