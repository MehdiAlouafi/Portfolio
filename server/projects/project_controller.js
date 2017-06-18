const Project = require('./project_model');

module.exports = {
    getPublishedOnes(req, res, next) {
        Project
            .find({ published: true })
            .then(projects => res.json(projects))
            .catch(next);
    },
	getAll(req, res, next) {
		Project
			.find({})
			.then(projects => res.json(projects))
			.catch(next)
	},
	getOne(req, res, next) {
		Project
			.find({ _id: req.params.id })
			.then(project => res.json(project))
			.catch(next);
	},
	createOne(req, res, next) {
		let new_project = Object.assign(new Project(), req.body);

		Project
			.create(new_project)
			.then(project => res.json(project))
			.catch(next);
	},
	updateOne(req, res, next) {
		Project
			.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: req.body },
				{ new: true },
				(error, project) => {
					if (error) {
						next(error);
					} else {
						res.json(project);
					}
				}
			);
	},
	deleteOne(req, res, next) {
		Project
			.findByIdAndRemove(
				{ _id: req.params.id },
				(error, project) => {
					if (error) {
						next(error);
					} else {
						res
							.status(200)
							.send(`Congrats ! The project named "${project.title}" was deleted successfully !`);
					}
				}
			)
	}
};
