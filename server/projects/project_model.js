const mongoose = require('mongoose');
const moment = require('moment');

const projectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	published: { type: Boolean, default: false },
	addedAt: { type: String, default: moment().format('YYYY-MM-DD')},
	content: { type: Array, default: [] }
});

module.exports = mongoose.model('Project', projectSchema);
