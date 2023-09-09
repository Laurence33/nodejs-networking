const http = require('http');
const net = require('net');

const server = net.createServer();
const clients = [];
let currentId = 1;
server.on('connection', (socket) => {
  const clientId = currentId++;
  console.log('New connection to the server');

  clients.forEach((s) => s.socket.write(`User${clientId} joined the chat. `));
  clients.push({ id: clientId, socket });
  socket.write(`id-${clientId}`);

  socket.on('error', (err) => {
    if (err.message.includes('ECONNRESET')) {
      clients.forEach((s) => s.socket.write(`User${clientId} left the chat. `));
      clients.filter((c) => c.id === clientId);
    } else {
      console.log(`User${clientId} error:`, err.message);
    }
  });

  socket.on('data', (data) => {
    // console.log(`User ${s.id}: ${data}`);
    clients.forEach((s) => s.socket.write(`User${clientId}: ${data}`));
  });
});

const port = 3000;
server.listen(port, '127.0.0.1', () => {
  console.log(`listening on port ${port}`);
});
