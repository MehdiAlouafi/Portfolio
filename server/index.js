const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/user');
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/portfolio';
const mongoose = require('mongoose');
const fixtures = require('./imports/fixtures');
const app = express();

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

mongoose.connect(mongo_url, fixtures, options, (err) => {
	if (err !== undefined) console.log(err);

	console.log(`mongo connection established at ${mongo_url}`);
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

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
