const response = require('../utils/response');
const ClientsRepository = require('../repositories/clients');
const ChargesController = require('./charges');

const createClient = async (ctx) => {
	const {
		email = null,
		cpf = null,
		nome = null,
		tel = null,
	} = ctx.request.body;

	const { id = null } = ctx.state; // Esse Id é do usuário Logado no momento

	if (!email || !cpf || !nome || !tel || !id) {
		return response(ctx, 400, { mensagem: 'Cadastro mal formatado' });
	} else if (tel.length !== 14 || cpf.length !== 14) {
		return response(ctx, 400, { mensagem: 'Informações mal formatadas' });
	}

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
	return response(ctx, 201, { id: result?.id });
};

const editClient = async (ctx) => {
	const {
		id = null,
		nome = null,
		cpf = null,
		email = null,
		tel = null,
	} = ctx.request.body;

	if (!id || (!nome && !cpf && !email && !tel)) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	} else if (tel.length !== 14 || cpf.length !== 14) {
		return response(ctx, 400, { mensagem: 'Informações mal formatadas' });
	}

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
		});
		if (result) {
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
							telefone: client.tel,
							cobrancasFeitas,
							cobrancasRecebidas,
							estaInadimplente,
						};
					})
				);

				return response(ctx, 200, { clientes: newResult });
			} else {
				const newResult = result.filter(
					(client) =>
						client.nome.includes(busca) ||
						client.email.includes(busca) ||
						client.cpf.includes(busca)
				);
				return response(ctx, 200, { clientes: newResult });
			}
		}
	} else if (reports) {
		const clients = await ClientsRepository.listAllClients(id);
		const newResult = await Promise.all(
			clients.map(async (client) => {
				const {
					estaInadimplente,
				} = await ChargesController.calculateCharges(client.id);
				return { estaInadimplente };
			})
		);

		return newResult;
	}

	return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
};

module.exports = { createClient, editClient, listOrSearchClients };
