//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB =
  'mongodb+srv://dbadmin:dbadmin@cluster0-tnzgr.gcp.mongodb.net/sms?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
