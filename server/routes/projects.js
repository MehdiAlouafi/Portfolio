const projectRouter = require('express').Router();
const ProjectController = require('../projects/project_controller');
const Project = require('../projects/project_model');
const bodyParser = require('body-parser').urlencoded({ extended: true });

/*
	- 	exemple de requête et de récupération de l'id : Mon-Project-perso-OBJECTID
		cela à pour but de bénéficier d'une meilleur indexation du contenu sur les
		moteurs de recherches.
	.get('/projects/:id', (req, res) => {
		const params = req.params.id.split('-');
		console.log(params);
		const id = params[params.length - 1];
		res.send(id);
	})
*/
projectRouter
	.get('/projects', ProjectController.getAll)
	.post('/projects', bodyParser, ProjectController.createOne)
	.put('/projects/:id', bodyParser, ProjectController.updateOne)
	.delete('/projects/:id', bodyParser, ProjectController.deleteOne)

module.exports = projectRouter;
