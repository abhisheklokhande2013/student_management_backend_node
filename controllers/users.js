const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: function(req, res, next) {
    userModel.create(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        creation_dt: Date.now()
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: 'success',
            message: 'User created successfully!',
            data: null
          });
      }
    );
  },
  authenticate: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo) {
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign(
              { id: userInfo._id },
              req.app.get('secretKey'),
              { expiresIn: '1h' }
            );
            res.json({
              status: 'success',
              message: 'user found!',
              data: { user: userInfo, token: token }
            });
          } else {
            res.json({
              status: 'error',
              message: 'Invalid email/password!',
              data: null
            });
          }
        } else {
          res.json({
            status: 'error',
            message: 'User not found!',
            data: null
          });
        }
      }
    });
  }
};
