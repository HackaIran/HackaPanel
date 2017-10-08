const moment = require('moment');

const config = require('../config/hacka.config');

const start = moment().set(config.time.start);
const end = moment().set(config.time.end);

const secondsToStart = () => {
    const seconds = start.diff(moment(), 'seconds');
    return seconds;
};

const secondsToEnd = () => {
    const seconds = end.diff(moment(), 'seconds');
    return seconds;
};

const time = {
    toStart: secondsToStart(),
    toEnd: secondsToEnd(),
};

setInterval(() => {
    time.toStart--;
    time.toEnd--;
}, 1000);

module.exports = time;