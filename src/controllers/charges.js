const ChargesRepository = require('../repositories/charges');
const ClientsRepository = require('../repositories/clients');
const { sendEmail } = require('../utils/nodemailer');
const Emails = require('./emails');
const PagarMe = require('../utils/pagarme');
const response = require('../utils/response');
const {
	validateExistence,
	validateAmount,
	validateDate,
} = require('../helpers/helpers');

const calculateCharges = async (id) => {
	const charges = await ChargesRepository.getChargesByClientId(id);
	let [cobrancasFeitas, cobrancasRecebidas, estaInadimplente] = [0, 0, false];

	if (charges) {
		charges.forEach((charge) => {
			cobrancasFeitas += Number(charge.valor);
			if (charge.data_de_pagamento) {
				cobrancasRecebidas += Number(charge.valor);
			} else if (
				+charge.vencimento < +new Date() &&
				!charge.data_de_pagamento
			) {
				estaInadimplente = true;
			}
		});
	}
	return { cobrancasFeitas, cobrancasRecebidas, estaInadimplente };
};
/**
 * Cria uma nova Cobrança e previne erros com o valor e a data
 */
const createCharge = async (ctx) => {
	const {
		idDoCliente = null,
		descricao = null,
		valor = null,
		vencimento = null,
	} = ctx.request.body;

	validateExistence(ctx, idDoCliente)
	validateExistence(ctx, descricao)
	validateAmount(ctx, valor)
	validateExistence(ctx, vencimento)
	
	const [ano, mes, dia] = vencimento.split('/').reverse();

	validateDate(ctx, ano, mes, dia, vencimento);

	const client = await ClientsRepository.getClientById(idDoCliente);

	if (!client) {
		return response(ctx, 400, { mensagem: 'Cliente não encontrado' });
	}
	const { nome, email, cpf, tel } = client;

	const transaction = await PagarMe.gerarBoleto({
		amount: Number(valor),
		nome,
		email,
		cpf,
		tel,
	});

	if (transaction) {
		const createCharge = await ChargesRepository.createCharge({
			idDoCliente,
			descricao,
			valor: Number(valor),
			vencimento: vencimento.split('/').reverse().join('-'),
		});

		if (createCharge) {
			const result = await ChargesRepository.inserirLinkBoleto(
				transaction.postback_url,
				createCharge.id
			);

			sendEmail(
				email,
				'Boleto Gerado com sucesso',
				Emails.newCharge(nome, cpf, tel)
			);

			return response(ctx, 201, {
				cobranca: { ...result, vencimento: vencimento.slice(0, 10) },
			});
		}
	}
	return response(ctx, 400, { mensagem: 'Cobrança mal formatada' });
};

const listCharges = async (ctx) => {
	const { cobrancasPorPagina = null, offset = null } = ctx.query;
	const { id } = ctx.state;
	if (
		!cobrancasPorPagina ||
		!offset ||
		isNaN(Number(cobrancasPorPagina)) ||
		isNaN(Number(offset))
	) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	let charges = await ChargesRepository.getChargesByIdAndQuerys(
		id,
		offset,
		cobrancasPorPagina
	);

	if (charges) {
		return response(ctx, 200, {
			cobrancas: charges.map((c) => {
				let status = 'aguardando';
				if (c.data_de_pagamento) {
					status = 'pago';
				}
				if (
					+c.vencimento < +new Date() &&
					c.data_de_pagamento === null
				) {
					status = 'vencido';
				}
				return {
					id_do_cliente: c.id_do_cliente,
					descricao: c.descricao,
					valor: c.valor,
					vencimento: c.vencimento.toLocaleDateString(),
					link_do_boleto: c.link_do_boleto,
					status,
				};
			}),
		});
	}
	return response(ctx, 404, { mensagem: 'Cobranças não encontradas' });
};

const payCharge = async (ctx) => {
	const { idDaCobranca = null } = ctx.request.body;
	const charge = await ChargesRepository.getChargesById(idDaCobranca);
	if (charge) {
		const client = await ClientsRepository.getClientById(
			charge.id_do_cliente
		);
		if (+charge.vencimento < +new Date() && !charge.data_de_pagamento) {
			return response(ctx, 400, { mensagem: 'Boleto vencido' });
		} else if (charge.data_de_pagamento) {
			return response(ctx, 400, { mensagem: 'Boleto já foi pago' });
		}
		const dataAtual = `${new Date().toLocaleDateString()}`
			.split('/')
			.reverse()
			.join('-');

		const payment = await ChargesRepository.payCharge(
			dataAtual,
			idDaCobranca
		);
		if (payment) {
			sendEmail(
				client.email,
				'Pagamento Feito com Sucesso',
				Emails.paymentSuccess(client.nome, charge.valor, charge.id)
			);

			return response(ctx, 200, {
				mensagem: 'Cobrança paga com sucesso',
			});
		}
	}

	return response(ctx, 404, { mensagem: 'Cobrança não encontradas' });
};

module.exports = { calculateCharges, createCharge, listCharges, payCharge };
