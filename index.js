const Client = require('./client/Client');
const config = require('./config.json');

const client = new Client(config);

client.loginDefault();