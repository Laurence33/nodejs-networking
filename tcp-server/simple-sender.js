const net = require('net');

const socket = net.createConnection(
  {
    host: '127.0.0.1',
    port: 3000,
  },
  () => {
    socket.write('Hello server! This is from the sender.');
  }
);
