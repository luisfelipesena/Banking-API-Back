const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: process.env.MAILTRAP_HOST,
	port: process.env.MAILTRAP_PORT,
	secure: false,
	auth: {
		user: process.env.MAILTRAP_USER,
		pass: process.env.MAILTRAP_PW,
	},
});

const sendEmail = async (userName, userEmail, to, subject, html) => {
	const email = await transporter.sendMail({
		from: `'${userName}' <${userEmail}>`,
		to,
		subject,
		html,
	});

	return email;
};
module.exports = { sendEmail };
