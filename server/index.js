const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const projectRoutes = require('./routes/projects');

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api', projectRoutes);

app.listen(PORT, (err) => {
	if (err) console.log(err);

	console.log(`Started node app at port : ${PORT}. Enjoy !`);
});
