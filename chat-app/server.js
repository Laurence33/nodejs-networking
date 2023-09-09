const http = require('http');
const net = require('net');

const server = net.createServer();
const clients = [];
server.on('connection', (socket) => {
  console.log('New connection to the server');
  clients.push(socket);
  socket.on('error', (err) => console.log(`Client error`, err.message));
  socket.on('data', (data) => {
    console.log(`Client sent: ${data}`);
    clients.forEach((s) => s.write(data));
  });
});

const port = 3000;
server.listen(port, '127.0.0.1', () => {
  console.log(`listening on port ${port}`);
});
