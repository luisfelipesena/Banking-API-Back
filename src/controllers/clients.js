const response = require('../utils/response');
const ClientRepository = require('../repositories/clients');

const createClient = async (ctx) => {
	const {
		email = null,
		cpf = null,
		nome = null,
		tel = null,
	} = ctx.request.body;

	if (!email || !cpf || !nome || !tel) {
		return response(ctx, 400, { mensagem: 'Cadastro mal formatado' });
	}

	const existingClient = await ClientRepository.getClientByEmail(email);

	if (existingClient) {
		return response(ctx, 400, { mensagem: 'Cliente já existente' });
	}

	const result = await ClientRepository.createClient({
		nome,
		email,
		cpf,
		tel,
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
	}

	const oldClient = await ClientRepository.getClientById(id);
	if (oldClient) {
		const newClient = {
			...oldClient,
			nome,
			cpf,
			email,
			tel,
		};

		const result = await ClientRepository.editClient(newClient);
		if (result) {
			return response(ctx, 200, {
				id: result.id,
				nome: result.nome,
				cpf: result.cpf,
				email: result.email,
			});
		}
	}

	return response(ctx, 404, { message: 'Cliente não encontrado' });
};

module.exports = { createClient, editClient };
