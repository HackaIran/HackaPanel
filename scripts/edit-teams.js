const { prompt } = require('inquirer')
const md5 = require('md5')
const chalk = require('chalk')

const Team = require('../server/model/Team')

const showOptions = (team) => {
    prompt([{
        type : 'list',
        name : 'choice',
        message : 'Which team do you want to edit?',
        choices: [
            'Edit name',
            'Re-Generate Password',
            'Kick out from Server',
            'Remove',
            '[Back]'
        ]
    }]).then(answers => {
        const choice = answers.choice.toLowerCase();

        // If Edit name chose
        if (choice === 'edit name') {
            prompt([{
                type: 'text',
                name: 'name',
                message: `Enter ${team}'s new name:`
            }]).then(ans => {
                Team.updateOne({ username: team }, { name: ans.name }, err => {
                    if (err) {
                        console.error(err)
                        return showMenu()
                    }
                    console.log(`${team} new name is ${ans.name}`);
                    showMenu();
                })
            })
        }

        // If Re-Generate Password chose
        if (choice === 're-generate password') {
            prompt([{
                type: 'list',
                name: 'choice',
                choices: ['No', 'Yes'],
                message: `Are you sure to re-generate a password for ${team}?`
            }]).then(ans => {
                if (ans.choice === 'No') return showMenu();
                const password = Math.random().toString(36).substring(10);
                Team.updateOne({ username: team }, { password: md5(password) }, err => {
                    if (err) {
                        console.error(err)
                        return showMenu()
                    }
                    console.log(chalk`${team} password has been changed! new password is {bgYellow.black  ${password} }`);
                    showMenu();
                })
            })
        }

        // If Kick out chose
        if (choice === 'kick out from server') {
            prompt([{
                type: 'list',
                name: 'choice',
                choices: ['No', 'Yes'],
                message: `Are you sure to kick ${team} out from server?`
            }]).then(ans => {
                if (ans.choice === 'No') return showMenu();
                Team.updateOne({ username: team }, { socketId: '' }, err => {
                    if (err) {
                        console.error(err)
                        return showMenu()
                    }
                    console.log(`${team} has been successfuly kicked out!`);
                    showMenu();
                })
            });
        }

        // If remove chose
        if (choice === 'remove') {
            prompt([{
                type: 'list',
                name: 'choice',
                choices: ['No', 'Yes'],
                message: `Are you sure to remove ${team}?`
            }]).then(ans => {
                if (ans.choice === 'No') return showMenu();
                Team.deleteOne({ username: team }, err => {
                    if (err) {
                        console.error(err)
                        return showMenu()
                    }
                    console.log(`${team} has been successfuly removed!`);
                    showMenu();
                })
            })
        }

        // If back chose
        if (choice === '[back]') {
            showMenu();
        }

    })
}

const showMenu = () => {
    Team.find({}, (err, teams) => {
        if (err) return console.error(err);
        const choices = teams.map(item => item.username);
        prompt([{
            type : 'list',
            name : 'choice',
            message : 'Which team do you want to edit?',
            choices: choices
        }]).then(answers => {
            showOptions(answers.choice)
        })
    })
}

showMenu();