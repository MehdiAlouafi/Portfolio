const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/user');
const { MONGO_USERNAME, MONGO_SECRET } = require('./imports/config/index');
const mongoose = require('mongoose');
const fixtures = require('./imports/fixtures');
const dev_mode = process.env.NODE_ENV !== 'production';
const mongo_url = !dev_mode ? `mongodb://${MONGO_USERNAME}:${MONGO_SECRET}@ds161012.mlab.com:61012/portfolio` : 'mongodb://localhost/portfolio';
const app = express();
const path = require('path');

if (dev_mode) {
    app.use(morgan('dev'));
    // Enable CORS so that we can make HTTP request from webpack-dev-server
    	app.use((req, res, next) => {
    		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE, PUT');
    		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    		next();
    	});
}

app.use(express.static(path.resolve(__dirname + '/../client/dist')));
app.use('/img', express.static(path.resolve(__dirname + '/../uploads')));

// TODO: mettre les options en second param de la méthode connect
// mettre un mdp / user à la bdd mongo en prod

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

mongoose.connect(mongo_url, options, (err) => console.log(err || 'MongoDb connection established'));

const Project = require('./projects/project_controller.js');

mongoose.Promise = global.Promise;

app.use('/api', projectRoutes);
app.use('/', userRoutes);

// error handling middleware
app.use(function (err, req, res, next) {
	console.error(err.stack);
	console.log(err);
	res.status(500).send('Something broke!');
});

app.listen(PORT, (err) => {
	if (err) console.log(err);

	console.log(`Started node app at port : ${PORT}. Enjoy !`);
});
