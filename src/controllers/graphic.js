const ChargesRepository = require('../repositories/charges');
const response = require('../utils/response');
const meses = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];
const horas = [
	'00:00',
	'02:00',
	'04:00',
	'08:00',
	'10:00',
	'12:00',
	'14:00',
	'16:00',
	'18:00',
	'20:00',
	'22:00',
];

/**
 *
 * Em Desenvolvimento
 */
const getGraphic = async (ctx) => {
	const { tempT } = ctx.query;
	const { id = null } = ctx.state;
	let charges = await ChargesRepository.getChargesByUserId(id);
	let faturamento = 0;
	if (!charges) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	if (tempT === 'mes') {
		meses.forEach(m);
	} else if (tempT === 'dia') {
		charges = charges.filter(
			(c) =>
				new Date(c.data_de_criacao).getDate() === new Date().getDate()
		);
	}

	return response(ctx, 200, {
		grafico: {
			faturamento,
		},
	});
};

module.exports = { getGraphic };
