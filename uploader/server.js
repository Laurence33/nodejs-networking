const net = require('net');
const fs = require('node:fs/promises');

const server = net.createServer(() => {});
let fileHandle, fileWriteStream;

server.on('connection', async (socket) => {
  console.log('New connection');

  socket.on('data', async (data) => {
    if (!fileHandle) {
      socket.pause();
      const indexOfDivider = data.indexOf('-------');
      const filename = data.subarray(10, indexOfDivider).toString('utf-8');

      fileHandle = await fs.open(`storage/${filename}`, 'w');
      fileWriteStream = fileHandle.createWriteStream();

      fileWriteStream.on('drain', () => socket.resume()); // Continue when back-pressure is exhausted
      // You can only drain in WriteStream
      console.log('Writing for the first time, data:', data.toString('utf-8'));
      fileWriteStream.write(data.subarray(indexOfDivider + 7));
      socket.resume();
    } else {
      console.log('Writing data:', data.toString('utf-8'));
      if (!fileWriteStream.write(data)) {
        // Writing to destination file
        // Pause to release back-pressure
        socket.pause();
      }
    }
  });

  socket.on('end', () => {
    console.log('Connection ended.');
    fileHandle.close();
    // no need to end in server side, since ended already by client
  });

  socket.resume();
});

server.listen(5050, '::1', () => {
  console.log('Uploader server opened on', server.address());
});
