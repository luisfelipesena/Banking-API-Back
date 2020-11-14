const response = require('../utils/response');
const UsersRepository = require('../repositories/users');

const createUser = async (ctx) => {
	const { email = null, senha = null, nome = null } = ctx.request.body;
	if (!email || !senha || !nome) {
		return response(ctx, 400, { mensagem: 'Cadastro mal formatado' });
	}

	const existingUser = await UsersRepository.getUserByEmail(email);

	if (existingUser) {
		return response(ctx, 400, { mensagem: 'Usuário já existente' });
	}

	const result = await UsersRepository.createUser(nome, email, senha);
	return response(ctx, 201, { id: result?.id });
};

module.exports = { createUser };
