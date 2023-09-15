const net = require('net');
const fs = require('node:fs/promises');

const server = net.createServer(() => {});

server.on('connection', async (socket) => {
  console.log('New connection');

  const fileHandle = await fs.open(`storage/test.txt`, 'w');
  const fileWriteStream = fileHandle.createWriteStream();

  fileWriteStream.on('drain', () => socket.resume()); // Continue when back-pressure is exhausted
  // You can only drain in WriteStream

  socket.on('data', (data) => {
    // Writing to destination file
    if (!fileWriteStream.write(data)) {
      // Pause to release back-pressure
      socket.pause();
    }
  });

  socket.on('end', () => {
    console.log('Connection ended.');
    fileHandle.close();
    // no need to end in server side, since ended already by client
  });
});

server.listen(5050, '::1', () => {
  console.log('Uploader server opened on', server.address());
});
