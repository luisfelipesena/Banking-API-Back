const Router = require('koa-router');

const router = new Router();

const authenticationController = require('./controllers/auth');

const usersController = require('./controllers/users');
const clientsController = require('./controllers/clients');

const sessionMiddleware = require('./middlewares/session');

router.post('/auth', authenticationController);
router.post('/usuarios', usersController.createUser);
router.post('/clientes', sessionMiddleware, clientsController.createClient);

module.exports = router;
