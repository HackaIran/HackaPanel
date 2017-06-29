'use strict';

const log4js = require('log4js');
const pool = require('../db/db').pool;

let User = {
  getUsers: function getUsers(params, cb) {
    cb(null, {});
  },
  getUser: function getUser(params, cb) {
    let user = {
      id: params.id,
      name: 'user1'
    };
    cb(null, user);
  }
};

module.exports = User;
