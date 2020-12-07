const ChargesRepository = require('../repositories/charges');
const response = require('../utils/response');
const ClientsController = require('./clients');

const getReports = async (ctx) => {
	const { tempT } = ctx.query;
	const { id = null } = ctx.state;
	let clients = await ClientsController.listOrSearchClients(ctx, true);
	let charges = await ChargesRepository.getChargesByUserId(id);
	if (clients.status || !charges) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	if (tempT === 'mes') {
		clients = clients.filter(
			(c) =>
				new Date(c.data_de_criacao).getMonth() === new Date().getMonth()
		);
		charges = charges.filter(
			(c) =>
				new Date(c.data_de_criacao).getMonth() === new Date().getMonth()
		);
	} else if (tempT === 'ano') {
		clients = clients.filter(
			(c) =>
				new Date(c.data_de_criacao).getFullYear() ===
				new Date().getFullYear()
		);
		charges = charges.filter(
			(c) =>
				new Date(c.data_de_criacao).getFullYear() ===
				new Date().getFullYear()
		);
	} else if (tempT === 'dia') {
		clients = clients.filter(
			(c) =>
				new Date(c.data_de_criacao).getDate() === new Date().getDate()
		);
		charges = charges.filter(
			(c) =>
				new Date(c.data_de_criacao).getDate() === new Date().getDate()
		);
	}

	let [
		qtdClientesAdimplentes,
		qtdClientesInadimplentes,
		qtdCobrancasPrevistas,
		qtdCobrancasPagas,
		qtdCobrancasVencidas,
		saldoEmConta,
	] = [0, 0, 0, 0, 0, 0];

	charges.forEach((charge) => {
		const { valor, vencimento, data_de_pagamento } = charge;
		if (data_de_pagamento) {
			qtdCobrancasPagas++;
			saldoEmConta += Number(valor);
		} else if (+vencimento < +new Date()) {
			qtdCobrancasVencidas++;
		} else {
			qtdCobrancasPrevistas++;
		}
	});

	clients.forEach((client) => {
		if (client.estaInadimplente) {
			qtdClientesInadimplentes++;
		} else {
			qtdClientesAdimplentes++;
		}
	});

	return response(ctx, 200, {
		relatorio: {
			qtdClientesAdimplentes,
			qtdClientesInadimplentes,
			qtdCobrancasPrevistas,
			qtdCobrancasPagas,
			qtdCobrancasVencidas,
			saldoEmConta,
		},
	});
};

module.exports = { getReports };
