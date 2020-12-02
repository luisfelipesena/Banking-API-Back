const Router = require('koa-router');

const router = new Router();

const authenticationController = require('./controllers/auth');

const usersController = require('./controllers/users');
const clientsController = require('./controllers/clients');
const chargesController = require('./controllers/charges');
const reportsController = require('./controllers/reports');

const sessionMiddleware = require('./middlewares/session');
const encryptMiddleware = require('./middlewares/encrypt');

router.post('/auth', authenticationController);

router.post('/usuarios', encryptMiddleware, usersController.createUser);
router.put('/resetPassword', encryptMiddleware, usersController.resetPassword);
router.post('/resetPasswordEmail', usersController.resetPasswordEmail);

router.post('/clientes', sessionMiddleware, clientsController.createClient);
router.put('/clientes', sessionMiddleware, clientsController.editClient);
router.get(
	'/clientes',
	sessionMiddleware,
	clientsController.listOrSearchClients
);

router.post('/cobrancas', sessionMiddleware, chargesController.createCharge);
router.get('/cobrancas', sessionMiddleware, chargesController.listCharges);
router.put('/cobrancas', sessionMiddleware, chargesController.payCharge);

router.get('/relatorios', sessionMiddleware, reportsController.getReports);

module.exports = router;
