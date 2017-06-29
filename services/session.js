'use strict';

const _ = require('underscore');

let SessionService = {
  hasSession: function hasSession(req) {
    return (!_.isUndefined(req.session) && !_.isUndefined(req.session.userId))
  },
  getSession: function getSession(req) {
    return {
      userId: req.session.userId,
      userName: req.session.userName
    }
  },
  setSession: function setSession(req, user) {
    req.session.userId = user.id;
    req.session.userName = user.name;
  },
  removeSession: function removeSession(req) {
    req.session.destroy();
  }
};

module.exports = SessionService;

