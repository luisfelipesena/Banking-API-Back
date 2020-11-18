const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
	host: process.env.MAILTRAP_HOST,
	port: process.env.MAILTRAP_PORT,
	secure: false,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PW,
	},
});

const sendEmail = async (to, subject, html) => {
	const email = await transporter.sendMail({
		from: `'Cubos Banking' <cubosbanking@cubos.io>`,
		to,
		subject,
		html,
	});

	return email;
};
module.exports = { sendEmail };
