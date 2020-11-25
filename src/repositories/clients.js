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
	const { nome, email, cpf, tel, user_id } = props;
	const query = `INSERT INTO clients (
					nome, email, cpf, tel, user_id
					) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
	const result = await db.query({
		text: query,
		values: [nome, email, cpf, tel, user_id],
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

const listClients = async (props) => {
	const { offset, clientesPorPagina, id } = props;
	const query = `SELECT * FROM clients
					WHERE user_id=$1
					OFFSET $2
					LIMIT $3
					`;
	const result = await db.query({
		text: query,
		values: [id, Number(offset), Number(clientesPorPagina)],
	});
	return result.rows;
};

const listAllClients = async (user_id) => {
	const query = `SELECT * FROM clients
					WHERE user_id=$1`;
	const result = await db.query({
		text: query,
		values: [user_id],
	});
	return result.rows;
};

module.exports = {
	getClientByEmail,
	getClientById,
	createClient,
	editClient,
	listClients,
	listAllClients,
};
