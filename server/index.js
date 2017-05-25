const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const projectRoutes = require('./routes/projects');
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/portfolio';
const mongoose = require('mongoose');

const app = express();

// TODO: mettre les options en second param de la méthode connect
// mettre un mdp / user à la bdd mongo en prod
mongoose.connect(mongo_url, (err) => {
	if (err !== undefined) console.log(err);

	console.log(`mongo connection established at ${mongo_url}`);
});
mongoose.Promise = global.Promise;

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api', projectRoutes);

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
