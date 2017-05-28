const userRouter = require('express').Router();
const UserContoller = require('../users/user_controller');
const bodyParser = require('body-parser').urlencoded({ extended: true });

userRouter
	.post('/login', bodyParser, UserContoller.login)
	.post('/signup', bodyParser, UserContoller.signUp)

module.exports = userRouter;
