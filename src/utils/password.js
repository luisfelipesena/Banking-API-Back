const bycript = require('bcryptjs');

const comparison = async (password, hash) => {
	const comparison = await bycript.compare(password, hash);
	return comparison;
};

const encrypt = async (password) => {
	const hash = await bycript.encrypt(password, 10);
	return hash;
};

module.exports = { comparison, encrypt };
