'use strict';

const express = require('express');
const SocketServer = require('./Socket-Server')
const TeamAuth = require('./TeamAuth')
const fs = require('fs')

module.exports = (io) => {
  const router = express.Router();
  const teamAuth = new TeamAuth
  const socketServer = new SocketServer(io, teamAuth)
  
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index');
  });

  /* GET challenge page. */
  router.get('/challenge', function(req, res, next) {
    res.render('challenge');
  });

  /* POST login request. */
  router.post('/login', function(req, res, next) {
    const username = req.body.username
    res.json(teamAuth.login(username))
  })
    
  return router
};
