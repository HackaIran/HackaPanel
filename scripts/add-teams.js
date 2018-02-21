const { prompt } = require('inquirer')
const md5 = require('md5')
const chalk = require('chalk')

const Team = require('../server/model/Team')

const questions = [
    {
        type : 'input',
        name : 'name',
        message : 'Enter Team Name:'
    }, {
        type : 'input',
        name : 'username',
        message : 'Enter Team Username:',
        default: answers => answers.name.toLowerCase().split(' ').join('-'),
        validate: function (input) {
            const done = this.async();
            Team.findOne({ username: input }, (err, team) => {
                if (err) return console.error(`Mongoose error!`);
                if (team) {
                    console.log(chalk`\n{red "${input}" is reserved, please try another one!}`)
                    done(null, false)
                } else {
                    done(null, true)
                }
            })
        }
    }
]

const addTeam = () => new Promise((resolve, reject) => {
    console.log('\n')
    prompt(questions).then(answers => {
        const password = Math.random().toString(36).substring(10);
        const teamProps = {
            name: answers.name,
            username: answers.username,
            password: md5(password),
            socketId: '',
            score: 0
        };
        const team = new Team(teamProps);
        team.save(err => {
            if (err) {
                console.error(chalk`\n{bgRed  FAILD } coudln't add the team!\n`)
            } else {
                console.log(chalk`\n{bgGreen  SUCCESS } ${answers.name} added to teams! Team's username is {bgYellow.black  ${answers.username} } and their password is {bgYellow.black  ${password} }\n`)
            }
            return resolve()
        });
    })
})

const continueAddingTeams = () => {
    addTeam().then(() => {
        prompt([{
            type : 'list',
            name : 'shouldContinue',
            message : 'Do you want to add one more Team?',
            choices: ['Yes', 'No']
        }]).then(answers => {
            if (answers.shouldContinue === 'Yes') continueAddingTeams();
        })
    })
}

continueAddingTeams();