'use strict';

const express = require('express');
const SocketServer = require('./Socket-Server')
const TeamAuth = require('./TeamAuth')

module.exports = (io) => {
  const router = express.Router();
  const teamAuth = new TeamAuth
  const socketServer = new SocketServer(io, teamAuth)
  
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index');
  });

  router.post('/login', function(req, res, next) {
    const username = req.body.username
    res.json(teamAuth.login(username))
  })


  const usernames = ['choco', 'buban', 'sushi', 'dango', 'chichi']
  setInterval(()=>{
    socketServer.setScore(usernames[Math.floor(Math.random() * usernames.length)], Math.floor(Math.random() * 100))
  }, 3000)
    
  return router
};
