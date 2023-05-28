const udp = require('dgram');
const wakeOnLAN = (mac, options) => {
  const { address, port } = {
    address: '255.255.255.255',
    port: 9,
    ...options,
  };
  // 创建UDP包
  const createPacket = Mac => {
    const macFormat = Mac.replaceAll('-', '');
    const bufMac = Buffer.from(macFormat, 'hex');
    const bufFirst = Buffer.alloc(6, 0xff);
    return Buffer.concat([bufFirst, Buffer.alloc(16 * bufMac.length, bufMac)]);
  };
  return new Promise((resolve, reject) => {
    const packet = createPacket(mac);
    const client = udp.createSocket('udp4');
    client.on('listening', () => {
      // 开启广播模式
      client.setBroadcast(true);
      console.log(client.address())
    })
    client.send(packet, port, address, err => {
      client.close();
      if (err) return reject(err);
      resolve('success');
    },
    );
    client.on('error', err => {
      client.close();
      reject(err);
    });
  });
};

module.exports = async (ctx, next) => {
  const { query } = ctx;
  const { mac, address, port } = query;
  const res = await wakeOnLAN(mac, {
    address,
    port
  });
  ctx.body = {
    res,
    ...query
  }
};
