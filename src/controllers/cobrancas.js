const ChargesRepository = require('../repositories/cobrancas');
const response = require('../utils/response');

const calculateCharges = async (id) => {
	const charges = await ChargesRepository.getChargesById(id);
	const [cobrancasFeitas, cobrancasRecebidas, estaInadimplente] = [
		0,
		0,
		false,
	];

	if (charges) {
		charges.forEach((charge) => {
			cobrancasFeitas += charge.valor;
			if (charge.status === 'pago') {
				cobrancasRecebidas += charge.valor;
			}
		});

		if (cobrancasFeitas > cobrancasRecebidas) {
			estaInadimplente = true;
		}
	}

	return { cobrancasFeitas, cobrancasRecebidas, estaInadimplente };
};

const createChange = async (ctx) => {
	const {
		idDoCliente = null,
		descricao = null,
		valor = null,
		vencimento = null,
	} = ctx.request.body;

	if (!idDoCliente || !descricao || !valor || !vencimento) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const result = await ChargesRepository.createCharge({
		idDoCliente,
		descricao,
		valor,
		vencimento,
	});

	if (result) {
		return response(ctx, 201, { cobranca: result });
	}
};

module.exports = { calculateCharges, createChange };
