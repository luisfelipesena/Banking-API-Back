const ChargesRepository = require('../repositories/charges');
const client = require('../utils/database');
const response = require('../utils/response');
const ClientsController = require('./clients');

const getReports = async (ctx) => {
	let clients = await ClientsController.listOrSearchClients(ctx, true);
	const { tempT } = ctx.params;
	let charges = await ChargesRepository.getCharges();
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
