const { exec } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const { Spinner } = require('clui');

let success = 0;
let expected = 0;

const start = () => npmInstall();

const npmInstall = () => {
    expected++;
    const countdown = new Spinner('Installing Node Packages');
    countdown.start();
    exec(`npm install`, (err, stdout, stderr) => {
        countdown.stop();
        if (err) {
            console.log(chalk`   {bgRed  ERR } npm install faild! find the errors in {yellow log.txt}\n`)
            fs.writeFileSync('./log.txt', err);
        }
        else {
            console.log(chalk`  {bgGreen  SUCCESS } npm install finished successfuly!\n`)
            success++;
        }
        webpack()
    })
}

const webpack = () => {
    expected++;
    const countdown = new Spinner('Bundling Application Script');
    countdown.start();
    exec(`webpack`, (err, stdout, stderr) => {
        countdown.stop();
        if (err) {
            console.log(chalk`  {bgRed  ERR } bundling application script faild! find the errors in {yellow log.txt}\n`)
            fs.writeFileSync('./log.txt', err);
        }
        else {
            console.log(chalk`  {bgGreen  SUCCESS } bundling application script finished successfuly!\n`);
            success++;
        }
        npmTest();
    })
}

const npmTest = () => {
    expected++;
    const countdown = new Spinner('Testing Everything');
    countdown.start();
    const child = exec(`npm test`, (err, stdout, stderr) => {
        countdown.stop();
        if (stderr.includes("FAIL")) {
            console.log(chalk`   {bgRed  ERR } npm test faild! You can check errors by running 'npm test'\n`)
        }
        else {
            console.log(chalk`  {bgGreen  SUCCESS } HackaPanel passed the test and everything is right!\n`)
            success++;
        }
        finish()
    });
    setTimeout(() => child.kill(), 10 * 1000);
}

const finish = () => {
    if (success === expected) {
        console.log(chalk`  {green HackaPanel installation finished successfuly! }\n`)
    } else {
        console.log(chalk`  {red HackaPanel installation faild! }\n`)
    }
}

start();