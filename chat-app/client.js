const net = require('net');
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = async (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => resolve());
  });
};

const moveCursor = async (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(0, -1, () => resolve());
  });
};

const socket = net.createConnection(
  {
    host: '127.0.0.1',
    port: 3000,
  },
  async () => {
    console.log(`Connected to server!`);
    const ask = async () => {
      const message = await rl.question('Enter message >');
      // move cursor up
      await moveCursor(0, -1);
      // clear whole line
      await clearLine(0);
      socket.write(message);
    };
    await ask();

    socket.on('data', async function (data) {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(data.toString('utf-8'));
      ask();
    });
  }
);

socket.on('end', () => console.log(`Connection ended.`));
socket.on('error', (err) => {
  if (err.message.includes('ECONNRESET')) {
    console.log('Connection was reset');
  } else {
    console.log('Unknown error', err.message);
  }
});
