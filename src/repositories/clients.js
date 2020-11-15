const db = require('../utils/database');

const getClientByEmail = async (email) => {
	const query = `SELECT * FROM clients
					WHERE email=$1`;
	const result = await db.query({
		text: query,
		values: [email],
	});

	return result.rows.shift();
};

const getClientById = async (id) => {
	const query = `SELECT * FROM clients
					WHERE id=$1`;
	const result = await db.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const createClient = async (props) => {
	const { nome, email, cpf, tel } = props;
	const query = `INSERT INTO clients (
					nome, email, cpf, tel
					) VALUES ($1,$2,$3,$4) RETURNING *`;
	const result = await db.query({
		text: query,
		values: [nome, email, cpf, tel],
	});
	return result.rows.shift();
};

const editClient = async (client) => {
	const { id, nome, cpf, email, tel } = client;
	const query = `UPDATE clients SET nome = $1,
					cpf = $2,
					email = $3,
					tel=$4 WHERE id = $5
					RETURNING *`;
	const result = await db.query({
		text: query,
		values: [nome, cpf, email, tel, id],
	});
	return result.rows.shift();
};

module.exports = { getClientByEmail, getClientById, createClient, editClient };
