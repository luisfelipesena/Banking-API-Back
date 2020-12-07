const response = require('../utils/response');
const UsersRepository = require('../repositories/users');
const { sendEmail } = require('../utils/nodemailer');
const Emails = require('./emails');
const { 
	validateEmail, 
	validateName, 
	validateExistence,
	validadteOldAndNewPassword
} = require('../helpers/helpers');

const createUser = async (ctx) => {
	const { email = null, nome = null } = ctx.request.body;
	const { hash = null } = ctx.state;

	validateExistence(ctx, hash);
	validateEmail(ctx, email);
	validateName(ctx, nome);

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
	const { email = null } = ctx.request.body;

	validateEmail(ctx, email);
	
	const existingUser = await UsersRepository.getUserByEmail(email);

	if (!existingUser) {
		response(ctx, 404, { mensagem: 'Usuário não encontrado'})
	}

	sendEmail(email, 'Usuário encaminhado para troca de senha', Emails.resetPassword(email, existingUser.id));
	return response(ctx, 200, { result: true });
}

const resetPassword = async (ctx) => {
	const { userId = null } = ctx.request.body;
	const { hash = null } = ctx.state;
	
	validateExistence(ctx, userId)
	validateExistence(ctx, hash);
	
	const oldPassword = await UsersRepository.getUserById(userId)
	const newPassword = await UsersRepository.resetPassword({ senha: hash, userId });

	validadteOldAndNewPassword(ctx, oldPassword, newPassword);
	return response(ctx, 200, { result: true });
};

module.exports = { createUser, resetPassword, resetPasswordEmail };
