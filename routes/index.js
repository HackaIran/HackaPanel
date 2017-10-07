const express = require('express');
const router = express.Router();
const Server = require('../server/Server');

const server = new Server();

/* GET home page. */
router.get('/', function(req, res, next) {
    const city = 'Karaj';
    res.render('index', {
        challenge: `<h1>ABCDEFGHIJKLMNOP</h1>`,
        title: `Hacka{${city}} | The Largest Community Of Developers`,
    });
});

module.exports = router;
