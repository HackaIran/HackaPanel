const fs = require('fs');
const express = require('express');
const router = express.Router();
const server = require('../server/server');
const marked = require('marked');
const config = require('../config/hacka.config');

let challenge = fs.readFileSync('./contest/challenge.md', 'utf-8');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        challenge: marked(challenge),
        title: `Hacka{${config.city}} | The Largest Community Of Developers`,
    });
});

module.exports = router;
