const db = require('../utils/database');

const getUserByEmail = async (email) => {
	const query = `SELECT * FROM users
					WHERE email=$1`;
	const result = await db.query({
		text: query,
		values: [email],
	});
	return result.rows.shift();
};

const createUser = async (props) => {
	const { nome, email, senha } = props;
	const query = `INSERT INTO users (
					nome, email, senha
					) VALUES ($1,$2,$3) RETURNING *`;
	const result = await db.query({
		text: query,
		values: [nome, email, senha],
	});
	return result.rows.shift();
};

module.exports = { getUserByEmail, createUser };
