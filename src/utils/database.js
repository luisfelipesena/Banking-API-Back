<<<<<<< HEAD
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	password: process.env.DB_PW,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	ssl: {
		rejectUnauthorized: false,
	},
});

client
	.connect()
	.then(() => console.log('connected'))
	.catch((err) => console.error('connection error', err.stack));

module.exports = client;
=======
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

client
	.connect()
	.then(() => console.log('connected'))
	.catch((err) => console.error('connection error', err.stack));

module.exports = client;
>>>>>>> b293fa9d5ba565d49c75f0bb50ca6eb17e5ce31c
