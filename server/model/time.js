const moment = require('moment');

const config = require('../../config/hacka.config');

const start = moment().set(config.time.start);
const end = moment().set(config.time.end);

const time = {
    toStart: start.diff(moment(), 'seconds'),
    toEnd: end.diff(moment(), 'seconds'),
};

setInterval(() => {
    time.toStart--;
    time.toEnd--;
}, 1000);

module.exports = time;