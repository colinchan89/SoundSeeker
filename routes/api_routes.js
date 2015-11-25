var usersController = require('../controllers/users_controller.js'),
		express = require('express'),
		apiRouter = express.Router(),
		soundcloudRoutes = require('./sc.js')

apiRouter.route('/users')
	.post(usersController.create)
	.get(usersController.index)

apiRouter.route('/users/:user_id')
	.get(usersController.show)
	.delete(usersController.destroy)

apiRouter.use('/', soundcloudRoutes)

module.exports = apiRouter
