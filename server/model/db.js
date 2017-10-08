const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hacka', { useMongoClient: true });

module.exports = mongoose