const { prompt } = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

let config = {
    city: "",
    time: {
        start: {
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        end: {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    db: {
        host: 'mongodb://localhost/',
        dbname: 'hacka'
    }
};

const showOptions = async () => {
    const data = await prompt([{
        type: 'input',
        name: 'city',
        message: `Enter city you want to hold the event:`
    }, {
        type: 'input',
        name: 'start',
        message: `Enter start time (e.g. 11:00:00):`
    }, {
        type: 'input',
        name: 'end',
        message: `Enter end time (e.g. 13:05:00):`
    }]);

    config.city = data.city;

    const start = data.start.split(':');
    const end = data.end.split(':');

    config.time.start = { hours: parseInt(start[0]) || 0, minutes: parseInt(start[1]) || 0, seconds: parseInt(start[2]) || 0 };
    config.time.end = { hours: parseInt(end[0]) || 0, minutes: parseInt(end[1]) || 0, seconds: parseInt(start[2]) || 0 };

    const configStr = 'module.exports = ' + JSON.stringify(config);
    fs.writeFileSync('./config/hacka.config.js', configStr);
}

showOptions()