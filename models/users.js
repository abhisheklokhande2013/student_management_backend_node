var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, require: true },
  creation_dt: { type: Date, require: true }
});

// Hash user password before saving into database
UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model('User', UserSchema);
