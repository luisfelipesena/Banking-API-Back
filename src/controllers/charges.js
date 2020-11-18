const ChargesRepository = require('../repositories/charges');
const ClientsRepository = require('../repositories/clients');
const { sendEmail } = require('../utils/nodemailer');
const Emails = require('./emails');
const PagarMe = require('./pagarme');
const response = require('../utils/response');

const calculateCharges = async (id) => {
	const charges = await ChargesRepository.getChargesByClientId(id);
	let [cobrancasFeitas, cobrancasRecebidas, estaInadimplente] = [0, 0, false];

	if (charges) {
		charges.forEach((charge) => {
			cobrancasFeitas += Number(charge.valor);
			if (charge.status === 'pago') {
				cobrancasRecebidas += Number(charge.valor);
			}
			if (+charge.vencimento < +new Date() && charge.status !== 'pago') {
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

	const [ano, mes, dia] = vencimento.split('/').reverse();
	if (!idDoCliente || !descricao || !valor || !vencimento) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	} else if (
		!new Date(ano, mes, dia) ||
		vencimento.length !== 10 ||
		+new Date(ano, mes - 1, dia) < +new Date()
	) {
		return response(ctx, 400, {
			mensagem: 'Data de vencimento mal formatada',
		});
	} else if (Number(valor) <= 0) {
		return response(ctx, 400, { mensagem: 'Valor mal formatado' });
	}

	const { nome, email, cpf, tel } = await ClientsRepository.getClientById(
		idDoCliente
	);

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
				transaction.boleto_url, // Caso postback_url -> .postback_url
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
				let status = c.status;
				if (+c.vencimento < +new Date() && c.status !== 'pago') {
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
		if (+charge.vencimento < +new Date()) {
			return response(ctx, 400, { mensagem: 'Boleto vencido' });
		} else if (charge.status == 'pago') {
			return response(ctx, 400, { mensagem: 'Boleto já foi pago' });
		}
		const payment = await ChargesRepository.payCharge(idDaCobranca);
		if (payment) {
			sendEmail(
				client.email,
				'Pagamento Feito com Sucesso',
				Emails.paymentSuccess(client.nome, charge.valor, charge.id)
			);
			return response(ctx, 200, { status: payment.status });
		}
	}

	return response(ctx, 404, { mensagem: 'Cobrança não encontradas' });
};

module.exports = { calculateCharges, createCharge, listCharges, payCharge };
