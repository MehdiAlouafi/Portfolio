const User = require('../../users/user_model');
const Project = require('../../projects/project_model');

const userFixtures = () => {
	User
		.find({})
		.count((err, count) => {
			if (count === 0) {
				const infos = {
					email: 'alouafi.mehdi@gmail.com',
					password: 'hello_world',
					name: 'Mehdi'
				};

				const admin = Object.assign({}, new User(), infos);
				User
					.create(admin)
					.then(user => {
						return console.log('Welcome on board mister');
					}).catch(err => console.log('ERR FIXTURES', err));
			}
		});
}

module.exports = userFixtures;
