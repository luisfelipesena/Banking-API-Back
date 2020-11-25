<<<<<<< HEAD
const db = require('../utils/database');

const getCharges = async () => {
	const query = `SELECT * FROM cobrancas`;
	const result = await db.query({
		text: query,
	});
	return result.rows;
};

const getChargesById = async (id) => {
	const query = `SELECT * FROM cobrancas
					WHERE id=$1`;
	const result = await db.query({
		text: query,
		values: [id],
	});
	return result.rows.shift();
};

const getChargesByClientId = async (id) => {
	const query = `SELECT * FROM cobrancas
					WHERE id_do_cliente=$1`;
	const result = await db.query({
		text: query,
		values: [id],
	});
	return result.rows;
};

const getChargesByIdAndQuerys = async (id, offset, limit) => {
	const query = `SELECT * FROM cobrancas
					WHERE id_do_cliente=$1
					OFFSET $2
					LIMIT $3`;
	const result = await db.query({
		text: query,
		values: [id, offset, limit],
	});
	return result.rows;
};

const createCharge = async (props) => {
	const { idDoCliente, descricao, valor, vencimento } = props;
	const query = `INSERT INTO cobrancas 
					(id_do_cliente,descricao,valor,vencimento)
					VALUES ($1,$2,$3,$4) RETURNING *`;
	const result = await db.query({
		text: query,
		values: [idDoCliente, descricao, valor, vencimento],
	});
	return result.rows.shift();
};

const inserirLinkBoleto = async (link, id) => {
	const query = `UPDATE cobrancas
					SET link_do_boleto=$1
					WHERE id=$2 RETURNING *`;
	const result = await db.query({
		text: query,
		values: [link, id],
	});

	return result.rows.shift();
};

const payCharge = async (date, id) => {
	const query = `UPDATE cobrancas
					SET data_de_pagamento=$1
					WHERE id=$2 RETURNING *`;
	const result = await db.query({
		text: query,
		values: [date, id],
	});

	return result.rows.shift();
};

module.exports = {
	getCharges,
	getChargesById,
	getChargesByClientId,
	getChargesByIdAndQuerys,
	createCharge,
	inserirLinkBoleto,
	payCharge,
};
=======
const db = require('../utils/database');

const getCharges = async () => {
	const query = `SELECT * FROM cobrancas`;
	const result = await db.query({
		text: query,
	});
	return result.rows;
};

const getChargesById = async (id) => {
	const query = `SELECT * FROM cobrancas
					WHERE id=$1`;
	const result = await db.query({
		text: query,
		values: [id],
	});
	return result.rows.shift();
};

const getChargesByClientId = async (id) => {
	const query = `SELECT * FROM cobrancas
					WHERE id_do_cliente=$1`;
	const result = await db.query({
		text: query,
		values: [id],
	});
	return result.rows;
};

const getChargesByIdAndQuerys = async (id, offset, limit) => {
	const query = `SELECT * FROM cobrancas as co
					INNER JOIN clients as cl
					ON co.id_do_cliente = cl.id::varchar
					INNER JOIN users as us
					ON us.id::varchar = cl.user_id
					WHERE us.id=$1
					OFFSET $2
					LIMIT $3`;
	const result = await db.query({
		text: query,
		values: [id, offset, limit],
	});
	return result.rows;
};

const createCharge = async (props) => {
	const { idDoCliente, descricao, valor, vencimento } = props;
	const query = `INSERT INTO cobrancas 
					(id_do_cliente,descricao,valor,vencimento)
					VALUES ($1,$2,$3,$4) RETURNING *`;
	const result = await db.query({
		text: query,
		values: [idDoCliente, descricao, valor, vencimento],
	});
	return result.rows.shift();
};

const inserirLinkBoleto = async (link, id) => {
	const query = `UPDATE cobrancas
					SET link_do_boleto=$1
					WHERE id=$2 RETURNING *`;
	const result = await db.query({
		text: query,
		values: [link, id],
	});

	return result.rows.shift();
};

const payCharge = async (date, id) => {
	const query = `UPDATE cobrancas
					SET data_de_pagamento=$1
					WHERE id=$2 RETURNING *`;
	const result = await db.query({
		text: query,
		values: [date, id],
	});

	return result.rows.shift();
};

module.exports = {
	getCharges,
	getChargesById,
	getChargesByClientId,
	getChargesByIdAndQuerys,
	createCharge,
	inserirLinkBoleto,
	payCharge,
};
>>>>>>> b293fa9d5ba565d49c75f0bb50ca6eb17e5ce31c
