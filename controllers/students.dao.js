//In the Data Access Object (DOA) layer, we can define the function which is directly connected to the database and fetch data and save data from and to the database.
var mongoose = require('mongoose');
var studentSchema = require('../models/students');

//Statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
studentSchema.statics = {
  create: function(data, cb) {
    var student = new this(data);
    student.save(cb);
  },

  get: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
};

var studentModel = mongoose.model('Student', studentSchema);
module.exports = studentModel;
