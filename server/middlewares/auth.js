const config = require('../imports/config/index.js');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const createToken = (name) => {
	const payload = {
		sub: name,
		exp: moment().add(1, 'day').unix()
	};
	return jwt.sign(payload, config.TOKEN_SECRET);
};

const verifyAuth = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (token !== undefined) {
		jwt.verify(token, config.TOKEN_SECRET, (err, payload) => {
			if (err && !payload) {
				return res.status(500).send('Failed to authenticate token');
			} else {
				next();
			}
		});
	} else {
		return res.status(403).send('No token provided');
	}
};

module.exports = { verifyAuth, createToken }
