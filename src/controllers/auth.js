const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const { comparison } = require('../utils/password');
const UsersRepository = require('./users');
require('dotenv').config();

const authentication = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;
	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Login mal formatado' });
	}

	const existingUser = await UsersRepository.getUserByEmail(email);
	if (existingUser) {
		const comparacao = await comparison(password, user.senha);
		if (comparacao) {
			const token = await jwt.sign(
				{ id: existingUser.id, email: existingUser.email },
				process.env.JWT_SECRET || 'cubosacademy',
				{
					expiresIn: `1hr`,
				}
			);

			return response(ctx, 200, {
				mensagem: 'Usuário logado com sucesso!',
				token: token,
			});
		}
	}
	return response(ctx, 400, { mensagem: 'Email ou senha incorretos' });
};

module.exports = authentication;