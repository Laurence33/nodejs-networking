const net = require('net');

const client = net.createConnection(
  {
    host: '127.0.0.1',
    port: 3000,
  },
  () => console.log(`Connected to server!`)
);

client.on('data', function (data) {
  console.log(`server sent: ${data}`);
});

client.on('end', () => console.log(`Connection ended.`));
client.on('error', (err) => {
  if (err.message.includes('ECONNRESET')) {
    console.log('Connection was reset');
  } else {
    console.log('Unknown error', err.message);
  }
});
