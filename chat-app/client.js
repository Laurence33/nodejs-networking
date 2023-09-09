const net = require('net');
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection(
  {
    host: '127.0.0.1',
    port: 3000,
  },
  async () => {
    console.log(`Connected to server!`);
    const message = await rl.question('Enter message >');
    socket.write(message);
  }
);

socket.on('data', function (data) {
  console.log(data.toString('utf-8'));
});

socket.on('end', () => console.log(`Connection ended.`));
socket.on('error', (err) => {
  if (err.message.includes('ECONNRESET')) {
    console.log('Connection was reset');
  } else {
    console.log('Unknown error', err.message);
  }
});
