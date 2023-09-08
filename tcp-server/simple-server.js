const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data);
  });
});

const port = 3000;
const ip_address = '127.0.0.1';
server.listen(port, ip_address, () =>
  console.log('Listening on ', server.address())
);
