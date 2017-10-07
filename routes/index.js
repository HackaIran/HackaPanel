const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const city = 'Karaj';
    res.render('index', { title: `Hacka{${city}} | The Largest Community Of Developers` });
});

module.exports = router;
