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

const createClient = async (props) => {
	const { nome, email, cpf, tel, endereco } = props;
	const query = `INSERT INTO clients (
					nome, email, cpf, tel, endereco
					) VALUES ($1,$2,$3) RETURNING *`;
	const result = await db.query({
		text: query,
		values: [nome, email, cpf, tel, endereco],
	});
	return result.rows.shift();
};

module.exports = { getClientByEmail, createClient };
