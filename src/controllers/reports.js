const ChargesRepository = require('../repositories/charges');
const response = require('../utils/response');
const ClientsController = require('./clients');

const getReports = async (ctx) => {
	const clients = await ClientsController.listOrSearchClients(ctx, true);
	const charges = await ChargesRepository.getCharges();
	let [
		qtdClientesAdimplentes,
		qtdClientesInadimplentes,
		qtdCobrancasPrevistas,
		qtdCobrancasPagas,
		qtdCobrancasVencidas,
		saldoEmConta,
	] = [0, 0, 0, 0, 0, 0];

	charges.forEach((charge) => {
		const { valor, vencimento, status } = charge;
		if (status === 'pago') {
			qtdCobrancasPagas++;
			saldoEmConta += Number(valor);
		} else if (+vencimento < +new Date()) {
			qtdCobrancasVencidas++;
		} else if (status == 'aguardando') {
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