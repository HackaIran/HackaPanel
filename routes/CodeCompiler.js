const { spawn, exec } = require('child_process')
const fs = require('fs')
const util = require('util')
const config = require("../panel.config")
const ScoreChecker = require('./ScoreChecker')

const languages = {
    javascript: {
        ext: 'js',
        runPattern: 'node %s'
    },
    python: {
        ext: 'py',
        runPattern: 'py %s'
    },
    cplusplus: {
        ext: 'cpp',
        runPattern: ''
    },
    csharp: {
        ext: 'cs',
        runPattern: ''
    },
}

class CodeCompiler {
    constructor (socketServer) {
        this.socketServer = socketServer
        this.scoreChecker = new ScoreChecker(this)
    }
    saveAndRun (username, code, lang) {
        const filepath = './codes/' + username + '.' + languages[lang].ext
        fs.writeFile(filepath, code, 'utf8', (err) => {
            if (err) throw err;
            console.log(username + ' submited a new file!');
            exec(util.format(languages[lang].runPattern, filepath), (err, stdout, stderr) => {
                if (err) throw err;
                this.checkCompiledCode(username, stdout, stderr)
            })
        })
    }
    checkCompiledCode (username, stdout, stderr) {
        const score = this.scoreChecker.check(stdout)
        this.socketServer.setScore(username, score)
    }
    
}

module.exports = CodeCompiler