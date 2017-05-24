const projectRouter = require('express').Router();


projectRouter
	.get('/projects', (req, res) => res.send('Hello from /projects route'));

module.exports = projectRouter;
