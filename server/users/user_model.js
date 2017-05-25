const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');

// Our schema defines 3 fields, notice email must be unique
// + the select option defines whether or not the field
// shows in a query (default: true)
//  MySQL standard yyyy-mm-dd format date
const userSchema = new mongoose.Schema({
	role: { type: String },
	registeredAt: { type: String, default: moment().format('YYYY-MM-DD') },
	email: { type: String, unique: true, lowercase: true },
	password: { type: String, select: false },
	name: String
});

userSchema.pre('save', function (next) {
	const user = this;
  // before saving a hashed version of the password is created and saved into the db
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(`${ user.email + user.registeredAt + user.password }`, salt, function (err, hash) {
			user.password = hash;
			next();
		});
	});
});

// This utility function comes handy during authentication
userSchema.methods.comparePwd = function(password, done) {

  // Compare the password sent by the user with the one stored in the db
	bcrypt.compare(`${this.email + this.registeredAt + password}`, this.password, (err, isMatch) => {
		done(err, isMatch);
	});
};

// Export the model
module.exports = mongoose.model('User', userSchema);
