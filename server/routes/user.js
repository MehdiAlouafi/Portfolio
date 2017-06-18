const userRouter = require('express').Router();
const UserContoller = require('../users/user_controller');
const bodyParser = require('body-parser');

userRouter
	.post('/login', bodyParser.json(), UserContoller.login)
	.post('/signup', bodyParser.json(), UserContoller.signUp)

module.exports = userRouter;
