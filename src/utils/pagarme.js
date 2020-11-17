import pagarme from 'pagarme';
require('dotenv').config();

const pay = async (props) => {
	const { amount, nome, cpf, email, tel } = props;
	const client = await pagarme.client.connect({
		api_key: process.env.API_KEY,
	});

	const transaction = await client.transactions.create({
		amount: `${amount}`,
		payment_method: 'boleto',
		postback_url: 'http://requestb.in/pkt7pgpk',
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
	return ({ status, boleto_url } = transaction);
};

module.exports = pay;
