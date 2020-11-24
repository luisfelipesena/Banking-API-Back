<<<<<<< HEAD
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const response = require('./src/utils/response');
const cors = require('@koa/cors'); // Evita o erro {'no-acess'}

const server = new Koa();
require('dotenv').config();

server.use(bodyparser());
server.use(cors());
server.use(router.routes());

const PORT = process.env.PORT; // Depois tirar pelo React_App_API_Url
server.use((ctx) =>
	response(ctx, 404, { mensagem: 'Conteúdo não encontrado' })
);
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
=======
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const response = require('./src/utils/response');
const cors = require('@koa/cors'); // Evita o erro {'no-acess'}

const server = new Koa();
require('dotenv').config();

server.use(bodyparser());
server.use(cors());
server.use(router.routes());

const PORT = process.env.PORT || 8081;
server.use((ctx) =>
	response(ctx, 404, { mensagem: 'Conteúdo não encontrado' })
);
server.listen(PORT, '0.0.0.0', null, () =>
	console.log(`Servidor rodando na porta ${PORT}`)
);
>>>>>>> b293fa9d5ba565d49c75f0bb50ca6eb17e5ce31c
