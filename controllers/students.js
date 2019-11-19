//all business logic (CRUD operations) contian in this file.
var Student = require('../controllers/students.dao');

//Create student
exports.create = function(req, res, next) {
  var student = {
    name: req.body.name,
    roll_no: req.body.roll_no,
    degree: req.body.degree,
    city: req.body.city
  };

  Student.create(student, function(err, student) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json({
        message: 'student entry is created successfully!'
      });
    }
  });
};

//Find or get all Students from db
exports.getAll = function(req, res, next) {
  Student.get({}, function(err, student) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.send(student);
    }
  });
};

//Find Student by id
exports.getById = function(req, res, next) {
  Student.get({ _id: req.params.id }, function(err, student) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.send(student);
    }
  });
};

//Update student
exports.updateById = function(req, res, next) {
  var student = {
    name: req.body.name,
    roll_no: req.body.roll_no,
    degree: req.body.degree,
    city: req.body.city
  };

  Student.update({ _id: req.params.id }, student, function(err, student) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json({
        message: 'student is updated successfully'
      });
    }
  });
};

//Delete student entry from DB
exports.deleteById = function(req, res, next) {
  Student.delete({ _id: req.params.id }, function(err, student) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json({
        message: 'student is deleted successfully'
      });
    }
  });
};
