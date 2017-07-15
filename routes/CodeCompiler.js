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
        runPattern: 'gcc %s'
    }
}

class CodeCompiler {
    constructor (socketServer) {
        this.socketServer = socketServer
        this.scoreChecker = new ScoreChecker(this)
    }
    saveAndRun (id, username, code, lang) {
        if (config.teams.hasOwnProperty(username)) {
            const filepath = './codes/' + username + '.' + languages[lang].ext
            fs.writeFile(filepath, code, 'utf8', (err) => {
                if (err) throw err;
                console.log(username + ' submited a new file!');
                exec(util.format(languages[lang].runPattern, filepath), (err, stdout, stderr) => {
                    const ret = {
                        hasCompileError: false,
                        hasCodeError: err ? true : false,
                        id: id,
                        username: username,
                        stdout: stdout,
                        stderr: stderr,
                        err: err == null ? null : err.message
                    }
                    this.checkCompiledCode(ret)
                })
            })
        } else {
            this.checkCompiledCode({
                id: id,
                hasCompileError: true,
                message: 'No username received'
            })
        }
    }
    checkCompiledCode (response) {
        if (!response.hasCompileError) {
            this.scoreChecker.check(response)
        }
        else {
            if (response.username === undefined) {
                console.warn('Could not submit a Code', response)
            }
        }
    }
    
}

module.exports = CodeCompiler