const { Client } = require ('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/lost_luxury');


client.connect();
console.log(CONNECTED);

//module.exports = client;