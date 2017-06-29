'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger('controllers/users');
const User = require('../models/users');

let UserController = {
  getUsers: function getUser(req, res, next) {
    let params = {};
    logger.debug(params);
    User.getUsers(params, function(err, user) {
      res.send(user);
    });
  },
  getUser: function getUser(req, res, next) {
    let params = {
      id: req.params.id
    };
    logger.debug(params);
    User.getUser(params, function(err, user) {
      res.send(user);
    });
  }
};

module.exports = UserController;
