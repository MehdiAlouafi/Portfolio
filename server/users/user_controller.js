const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('./user_model');
const { createToken } = require('../middlewares/auth');

module.exports = {
	signUp(req, res, next) {
		const new_user = Object.assign(new User(), req.body);
		const promise = User.create(new_user);
		promise
			.then(user => {
				return res.json({
					message: 'Welcome',
					token: createToken(user.name)
				})
			})
			.catch(next);
	},
	login(req, res) {
		User.findOne({ email: req.body.email }, '+password', (err, user) => {
			if (!user) {
				return res.status(401).json({ message: 'No User found' });
			}
			user.comparePwd(req.body.password, (err, isMatch) => {
				if (err && !isMatch) {
					return res.status(401).json({ message: 'Invalid email/password' });
				} else {
					return res.json({ message: 'Now logged in', token: createToken(user.name) });
				}
			});
		});
	}

};
