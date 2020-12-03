const response = require('../utils/response');
const UsersRepository = require('../repositories/users');
const validCpf = require("@fnando/cpf/commonjs");

function validateEmail(ctx, email) {
    if (!email) {
        return response(ctx, 404, { mensagem: 'Email obrigatório' });
    }
  
    const exp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/u.test(
      email,
    );
  
    if (!exp) {
        return response(ctx, 400, { mensagem: 'Email mal formatado' });
    }
  }

function validateName(ctx, name) {
    if (!name) {
        return response(ctx, 404, { mensagem: 'Nome obrigatório' });
    }

    const splitName = name.split(" ");

    if (splitName.length < 2) {
        return response(ctx, 400, { mensagem: 'Nome mal formatado' });
    }
}

function validateHash(ctx, hash) {
    if (!hash) {
        return response(ctx, 404, { mensagem: 'Senha obrigatória' });
    }
}

function validateId(ctx, id) {
    if (!id) {
        return response(ctx, 404, { mensagem: 'Id obrigatória' });
    }
}

function validadteOldAndNewPassword(ctx, oldPassword, newPassword) {
    if (oldPassword.senha === newPassword.senha) {
		return response(ctx, 400, { mensagem: "Senha idêntica à anterior"})
	}
}

function validateDocument(ctx, document) {
    if (!document) {
        response(ctx, 404, { mensagem: 'CPF não encontrado'})
    }

    const isValid = validCpf(document) || validCnpj(document);

    if (!isValid) {
        return response(ctx, 400, { mensagem: 'CPF mal formatado' });
    }
}

function validatePhoneNumber(ctx, phoneNumber) {
    if (!phoneNumber) {
        response(ctx, 404, { mensagem: 'Telefone não encontrado'})
    }
  
    const exp = /[+]+\d{13,14}/u.test(phoneNumber) && (phoneNumber.length === 13 || phoneNumber.length === 14);
  
    if (!exp) {
        return response(ctx, 400, { mensagem: 'Telefone mal formatado' });
    }
  }
  

module.exports = { 
    validateEmail, 
    validateName, 
    validateHash, 
    validateId,
    validadteOldAndNewPassword,
    validateDocument,
    validatePhoneNumber,
};