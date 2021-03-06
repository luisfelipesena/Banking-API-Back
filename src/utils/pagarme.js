const pagarme = require('pagarme');
const unmaskCpf = require('node-cpf');
require('dotenv').config();

const gerarBoleto = async (props) => {
	const { amount, nome, cpf, email, tel } = props;
	console.log(cpf, unmaskCpf.unMask(cpf));
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
					number: `${unmaskCpf.unMask(cpf)}`,
				},
			],
		},
	});
	return transaction;
};

module.exports = { gerarBoleto };
