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
    const fileStream = fileHandle.createReadStream();
    fileStream.on('data', (data) => {
      // Writing file to socket connection to the server
      socket.write(data);
    });

    fileStream.on('end', () => {
      console.log('File was successfully uploaded!');
      socket.end();
    });
  }
);
