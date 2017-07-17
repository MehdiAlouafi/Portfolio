const User = require('../../users/user_model');
const Project = require('../../projects/project_model');

const fixtures = () => {
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
    Project
        .find({})
        .count((err, count) => {
            if (count === 0) {
                const fakeProject = Object.assign({},
                    new Project(),
                    {
                        title: 'My project',
                        content: [
                            { type: 'img', src: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?dpr=2&auto=format&fit=crop&w=1080&h=1350&q=80&cs=tinysrgb&crop='},
                            { type: 'dot' },
                            { type: 'paragraph', text: 'Once upon a time, there a was a little kid' },
                            { type: 'paragraph', text: 'willing to change the world, unfortunately'},
                            { type: 'paragraph', text: 'he died.'},
                        ]
                    }
                );
                Project
                    .create(fakeProject)
                    .then(p => console.log('One fake project created'))
                    .catch(err => console.log('ERR FIXTURES', err));
            }
        })
}

module.exports = fixtures;
