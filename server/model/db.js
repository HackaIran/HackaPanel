const mongoose = require('mongoose');
const config = require('../../config/hacka.config');

mongoose.connect(`${config.db.host}${config.db.dbname}`, { useMongoClient: true });

module.exports = mongoose;