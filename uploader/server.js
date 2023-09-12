const net = require('net');
const fs = require('node:fs/promises');

const server = net.createServer(() => {});

server.on('connection', async (socket) => {
  console.log('New connection');

  const fileHandle = await fs.open(`storage/test.txt`, 'w');
  const fileStream = fileHandle.createWriteStream();
  socket.on('data', (data) => {
    // Writing to destination file
    fileStream.write(data);
  });

  socket.on('end', () => {
    console.log('Connection ended.');
    fileHandle.close();
  });
});

server.listen(5050, '::1', () => {
  console.log('Uploader server opened on', server.address());
});
