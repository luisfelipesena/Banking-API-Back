const ChargesRepository = require('../repositories/cobrancas');

const calculateCharges = async (id) => {
	const charges = await ChargesRepository.getChargesById(id);
	const [cobrancasFeitas, cobrancasRecebidas, estaInadimplente] = [
		0,
		0,
		false,
	];

	if (charges) {
		charges.forEach((charge) => {
			cobrancasFeitas += charge.cobranca;
			if (charge.status === 'pago') {
				cobrancasRecebidas += charge.cobranca;
			}
		});

		if (cobrancasFeitas > cobrancasRecebidas) {
			estaInadimplente = true;
		}
	}

	return { cobrancasFeitas, cobrancasRecebidas, estaInadimplente };
};

module.exports = { calculateCharges };
