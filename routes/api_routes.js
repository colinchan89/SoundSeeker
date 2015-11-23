var usersController = require('../controllers/users_controller.js'),
					apiRouter = require('express').Router()

apiRouter.route('/users')
	.post(usersController.createUser)
	.get(usersController.showAll)

apiRouter.route('/users/:email')
	.get(usersController.showUser)

apiRouter.route('/signin')
	.post(usersController.signIn)

module.exports = apiRouter
