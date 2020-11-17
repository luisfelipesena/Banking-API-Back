const db = require('../utils/database');

const getChargesById = async (id) => {
	const query = `SELECT * FROM cobrancas
					WHERE idDoCliente=$1`;
	const result = await db.query({
		text: query,
		values: [id],
	});
	return result.rows;
};

module.exports = { getChargesById };
