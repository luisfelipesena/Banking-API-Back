const Router = require('koa-router');

const router = new Router();

const authenticationController = require('./controllers/auth');

const usersController = require('./controllers/users');
const clientsController = require('./controllers/clients');
const chargesController = require('./controllers/cobrancas');

const sessionMiddleware = require('./middlewares/session');
const encryptMiddleware = require('./middlewares/encrypt');

router.post('/auth', authenticationController);

router.post('/usuarios', encryptMiddleware, usersController.createUser);

router.post('/clientes', sessionMiddleware, clientsController.createClient);
router.put('/clientes', sessionMiddleware, clientsController.editClient);
router.get(
	'/clientes',
	sessionMiddleware,
	clientsController.listOrSearchClients
);

router.post('/cobrancas', sessionMiddleware, chargesController.createChange);

module.exports = router;
