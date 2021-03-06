const response = require('../utils/response');
const ClientsRepository = require('../repositories/clients');
const ChargesController = require('./charges');
const {
	validateEmail,
	validateName,
	validateHash,
	validateId,
	validateDocument,
	validatePhoneNumber,
} = require('../helpers/helpers');

const createClient = async (ctx) => {
	const {
		email = null,
		cpf = null,
		nome = null,
		tel = null,
	} = ctx.request.body;

	const { id = null } = ctx.state; // Esse Id é do usuário Logado no momento

	validateEmail(ctx, email);
	validateDocument(ctx, cpf);
	validateName(ctx, nome);
	validateId(ctx, id);
	validatePhoneNumber(ctx, tel);

	const existingClient = await ClientsRepository.getClientByEmail(email);

	if (existingClient) {
		return response(ctx, 400, { mensagem: 'Cliente já existente' });
	}

	const result = await ClientsRepository.createClient({
		nome,
		email,
		cpf,
		tel,
		user_id: id,
	});
	return response(ctx, 201, { id: result.id });
};

const editClient = async (ctx) => {
	const {
		id = null,
		nome = null,
		cpf = null,
		email = null,
		tel = null,
	} = ctx.request.body;

	validateEmail(ctx, email);
	validateDocument(ctx, cpf);
	validateName(ctx, nome);
	validateId(ctx, id);
	validatePhoneNumber(ctx, tel);

	const oldClient = await ClientsRepository.getClientById(id);
	if (oldClient) {
		const newClient = {
			...oldClient,
			nome: nome ? nome : oldClient.nome,
			cpf: cpf ? cpf : oldClient.cpf,
			email: email ? email : oldClient.email,
			tel: tel ? tel : oldClient.tel,
		};

		const result = await ClientsRepository.editClient(newClient);
		if (result) {
			return response(ctx, 200, {
				id: result.id,
				nome: result.nome,
				cpf: result.cpf,
				email: result.email,
				tel: result.tel,
			});
		}
	}

	return response(ctx, 404, { message: 'Cliente não encontrado' });
};

const listOrSearchClients = async (ctx, reports = null) => {
	const { clientesPorPagina = null, offset = null, busca = null } = ctx.query;
	const { id } = ctx.state;
	if (clientesPorPagina && offset && !isNaN(Number(offset))) {
		const result = await ClientsRepository.listClients({
			clientesPorPagina,
			offset,
			id,
			busca,
		});
		if (result && id) {
			if (!busca) {
				const newResult = await Promise.all(
					result.map(async (client) => {
						const {
							cobrancasFeitas,
							cobrancasRecebidas,
							estaInadimplente,
						} = await ChargesController.calculateCharges(client.id);

						return {
							id: client.id,
							nome: client.nome,
							email: client.email,
							tel: client.tel,
							cobrancasFeitas,
							cobrancasRecebidas,
							estaInadimplente,
						};
					})
				);

				return response(ctx, 200, { clientes: newResult });
			} else {
				return response(ctx, 200, { clientes: result });
			}
		}
	} else if (reports && id) {
		const clients = await ClientsRepository.listAllClients(id);
		const newResult = await Promise.all(
			clients.map(async (client) => {
				const {
					estaInadimplente,
				} = await ChargesController.calculateCharges(client.id);
				return {
					estaInadimplente,
					data_de_criacao: client.data_de_criacao,
				};
			})
		);

		return newResult;
	}

	return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
};

module.exports = { createClient, editClient, listOrSearchClients };
