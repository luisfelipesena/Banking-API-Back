const db = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS users (
		id serial,
		nome varchar(255),
		email varchar(255),
		senha varchar(255)
	);`,

	2: `CREATE TABLE IF NOT EXISTS clients (
		id serial,
		userId varchar(255),
		nome varchar(255),
		email varchar(255),
		cpf varchar(255),
		tel varchar(255)	
	);`,

	3: `CREATE TABLE IF NOT EXISTS cobrancas (
		idDoCliente varchar(255),
		descricao varchar(255),
		valor bigint,
		cobranca bigint,
		vencimento varchar(255),
		linkDoBoleto varchar(255),
		validade varchar(255),
		status varchar(255)
	);`,
};

const up = async (number = null) => {
	if (number) {
		await db.query({ text: schema[number] });
	} else {
		for (const value in schema) {
			await db.query({ text: schema[value] });
		}
	}
	console.log('Migração Rodada');
};

const drop = async (table = null) => {
	if (table) {
		return db.query({ text: `DROP TABLE ${table}` });
	}
};

up();

// drop();
