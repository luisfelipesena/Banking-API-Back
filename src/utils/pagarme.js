<<<<<<< HEAD:src/utils/pagarme.js
const pagarme = require('pagarme');
require('dotenv').config();

const gerarBoleto = async (props) => {
	const { amount, nome, cpf, email, tel } = props;

	const client = await pagarme.client.connect({
		api_key: `${process.env.API_KEY}`,
	});

	const transaction = await client.transactions.create({
		amount: Number(`${amount}`),
		payment_method: 'boleto',
		// postback_url: 'http://www.google.com',
		customer: {
			type: 'individual',
			country: 'br',
			name: `${nome}`,
			email: `${email}`,
			phone_numbers: [`${tel}`],
			documents: [
				{
					type: 'cpf',
					number: `${cpf}`,
				},
			],
		},
	});
	return transaction;
};

module.exports = { gerarBoleto };
=======
const pagarme = require('pagarme');
require('dotenv').config();

const gerarBoleto = async (props) => {
	const { amount, nome, cpf, email, tel } = props;

	const client = await pagarme.client.connect({
		api_key: `${process.env.API_KEY}`,
	});

	const transaction = await client.transactions.create({
		amount: Number(`${amount}`),
		payment_method: 'boleto',
		postback_url: 'http://www.google.com', //modificar para o site de front
		customer: {
			type: 'individual',
			country: 'br',
			name: `${nome}`,
			email: `${email}`,
			phone_numbers: [`${tel}`],
			documents: [
				{
					type: 'cpf',
					number: `${cpf}`,
				},
			],
		},
	});
	return transaction;
};

module.exports = { gerarBoleto };
>>>>>>> b293fa9d5ba565d49c75f0bb50ca6eb17e5ce31c:src/controllers/pagarme.js
