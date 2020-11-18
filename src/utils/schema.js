const db = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS users (
		id serial primary key,
		nome varchar(255) not null,
		email varchar(255) not null,
		senha varchar(255) not null
	);`,

	2: `CREATE TABLE IF NOT EXISTS clients (
		id serial primary key,
		user_id varchar(255) not null,
		nome varchar(255) not null,
		email varchar(255) not null,
		cpf varchar(255) not null,
		tel varchar(255) not null	
	);`,

	3: `CREATE TABLE IF NOT EXISTS cobrancas (
		id serial primary key,
		id_do_cliente varchar(255) not null,
		descricao varchar(255) not null,
		valor bigint not null,
		vencimento date not null,
		link_do_boleto varchar(255) default null,
		status varchar(255) default 'aguardando'
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
