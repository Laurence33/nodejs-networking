const net = require('net');
const fs = require('node:fs/promises');

const socket = net.createConnection(
  {
    host: '::1',
    port: 5050,
  },
  async () => {
    const filePath = './text.txt';
    const fileHandle = await fs.open(filePath, 'r');
    const fileReadStream = fileHandle.createReadStream();
    fileReadStream.on('data', (data) => {
      // Writing file to socket connection to the server
      if (!socket.write(data)) {
        fileReadStream.pause();
      }
    });

    socket.on('drain', () => fileReadStream.resume());

    fileReadStream.on('end', () => {
      console.log('File was successfully uploaded!');
      socket.end();
    });
  }
);
