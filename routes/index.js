const fs = require('fs');
const express = require('express');
const router = express.Router();
const server = require('../server/server');
const marked = require('marked');

let challenge = fs.readFileSync('./contest/challenge.md', 'utf-8');

/* GET home page. */
router.get('/', function(req, res, next) {
    const city = 'Karaj';
    res.render('index', {
        challenge: marked(challenge),
        title: `Hacka{${city}} | The Largest Community Of Developers`,
    });
});

module.exports = router;
