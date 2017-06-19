const projectRouter = require('express').Router();
const ProjectController = require('../projects/project_controller');
const Project = require('../projects/project_model');
const bodyParser = require('body-parser').json();
const { verifyAuth } = require('../middlewares/auth');
const upload = require('../imports/multer');

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
    .post('/upload/:title', (req, res) => {
        upload(req, res, err => {
            if (err) console.log(err);
            res.status(200).send(req._filename);
        });
    })
	.get('/allProjects', ProjectController.getPublishedOnes)
	.get('/projects', verifyAuth, ProjectController.getAll)
	.get('/projects/:id', ProjectController.getOne)
	.post('/projects', verifyAuth, bodyParser, ProjectController.createOne)
	.put('/projects/:id', verifyAuth, bodyParser, ProjectController.updateOne)
	.delete('/projects/:id', verifyAuth, ProjectController.deleteOne)

module.exports = projectRouter;
