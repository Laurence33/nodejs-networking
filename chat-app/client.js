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

let id;
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
    ask();

    socket.on('data', async function (data) {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);

      const msg = data.toString('utf-8');
      if (msg.startsWith('id')) {
        // When we get our id
        id = msg.substring(3);
        console.log(`Your id is ${id}.\n`);
      } else {
        // When we get message from other client
        console.log(data.toString('utf-8'));
      }
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
