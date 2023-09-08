const http = require('http');
const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('New connection to the server');
  socket.write('Hello client!');
  socket.on('error', (err) => console.log(`Client error`, err.message));
});

const port = 3000;
server.listen(port, '127.0.0.1', () => {
  console.log(`listening on port ${port}`);
});
