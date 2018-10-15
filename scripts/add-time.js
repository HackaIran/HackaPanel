const { prompt } = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

const config = require('../config/hacka.config');

const showOptions = async () => {
    const data = await prompt([{
        type: 'input',
        name: 'minutes',
        message: `How many minutes do you want to add?`
    }]);

    const minutes = parseInt(data.minutes) % 60;
    const hours = Math.floor(parseInt(data.minutes) / 60);
    config.time.end.minutes = parseInt(config.time.end.minutes) + minutes;
    config.time.end.hours = parseInt(config.time.end.hours) + hours;

    const configStr = 'module.exports = ' + JSON.stringify(config);
    fs.writeFileSync('./config/hacka.config.js', configStr);
}

showOptions()