const express = require('express');
const router = express.Router();
const server = require('../server/server');

/* GET home page. */
router.get('/', function(req, res, next) {
    server.get('/');
    const city = 'Karaj';
    res.render('index', {
        challenge: `<h1>ABCDEFGHIJKLMNOP</h1>`,
        title: `Hacka{${city}} | The Largest Community Of Developers`,
    });
});

module.exports = router;
