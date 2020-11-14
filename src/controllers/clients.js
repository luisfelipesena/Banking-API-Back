const response = require('../utils/response');
const ClientRepository = require('../repositories/clients');

const createClient = async (ctx) => {
	const {
		email = null,
		cpf = null,
		nome = null,
		tel = null,
		endereco = null,
	} = ctx.request.body;

	if (!email || !cpf || !nome || !tel || !endereco) {
		return response(ctx, 400, { mensagem: 'Cadastro mal formatado' });
	}

	const existingClient = await ClientRepository.getClientByEmail(email);

	if (existingClient) {
		return response(ctx, 400, { mensagem: 'Cliente já existente' });
	}

	const result = await ClientRepository.createClient(
		nome,
		email,
		cpf,
		tel,
		endereco
	);
	return response(ctx, 201, { id: result?.id });
};

module.exports = { createClient };
