const response = require('../utils/response');
const UsersRepository = require('../repositories/users');
const { sendEmail } = require('../utils/nodemailer');
const Emails = require('./emails');

const createUser = async (ctx) => {
	const { email = null, nome = null } = ctx.request.body;
	const { hash = null } = ctx.state;
	if (!email || !nome || !hash) {
		return response(ctx, 400, { mensagem: 'Cadastro mal formatado' });
	}

	const existingUser = await UsersRepository.getUserByEmail(email);

	if (existingUser) {
		return response(ctx, 400, { mensagem: 'Usuário já existente' });
	}

	const result = await UsersRepository.createUser({
		nome,
		email,
		senha: hash,
	});

	sendEmail(email, 'Usuário criado com sucesso', Emails.newUser(nome));
	return response(ctx, 201, { id: result.id });
};

const resetPasswordEmail = async (ctx) => {
	const { userId = null } = ctx.request.body;
	if (!userId) {
		response(ctx, 404, { mensagem: 'Id não encontrado'})
	}
	const user = await UsersRepository.getUserById(userId);
	sendEmail(email, 'Usuário encaminhado para troca de senha', Emails.resetPassword(user.nome));
	return response(ctx, 200, { result: true });
}

const resetPassword = async (ctx) => {
	const { userId = null } = ctx.request.body;
	if (!userId) {
		response(ctx, 404, { mensagem: 'Id não encontrado'})
	} 
	const { hash = null } = ctx.state;
	const result = await UsersRepository.resetPassword({ senha: hash, userId });
	return response(ctx, 200, { result });
};

module.exports = { createUser, resetPassword, resetPasswordEmail };
