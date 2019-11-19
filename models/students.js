const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  roll_no: {
    type: String,
    required: true
  },
  degree: {
    type: String
  },
  city: {
    type: String
  }
});
module.exports = StudentSchema;
