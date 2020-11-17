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

const createCharge = async (props) => {
	const { idDoCliente, descricao, valor, vencimento } = props;
	const query = `INSERT INTO cobrancas 
					(idDoCliente,descricao,valor,vencimento)
					VALUES ($1,$2,$3,$4) RETURNING *`;
	const result = await db.query({
		text: query,
		values: [idDoCliente, descricao, valor, vencimento],
	});
	return result.rows.shift();
};

module.exports = { getChargesById, createCharge };
