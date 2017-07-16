const { spawn, exec } = require('child_process')
const fs = require('fs')
const util = require('util')
const config = require("../panel.config")
const ScoreChecker = require('./ScoreChecker')
const inputs = require('../challenge/inputs')

const languages = {
    javascript: {
        ext: 'js',
        input: 'var INPUT = `%s`',
        runPattern: 'node %s'
    },
    python: {
        ext: 'py',
        input: 'INPUT = """%s"""',
        runPattern: 'py %s'
    },
    csharp: {
        ext: 'cs',
        input: '',
        runPattern: 'csc %s'
    }
}

class CodeCompiler {
    constructor (socketServer) {
        this.socketServer = socketServer
        this.scoreChecker = new ScoreChecker(this)
    }
    run (id, username, code, lang) {
        if (config.teams.hasOwnProperty(username)) {
            const filepath = './codes/' + username + '.' + languages[lang].ext
            const exepath = './codes/' + username + '.exe'
            code = this.addInputToCode(inputs[0], code, lang)
            fs.writeFile(filepath, code, 'utf8', (err) => {
                if (err) throw err;
                console.log(username + ' submited a new file!');
                var childProcessDone = false
                var timeStampBeforeRunTheCode = Date.now()
                const child = exec(util.format(languages[lang].runPattern, filepath), (err, stdout, stderr) => {
                    childProcessDone = true
                    const ret = {
                        hasCompileError: false,
                        hasCodeError: err ? true : false,
                        id: id,
                        username: username,
                        stdout: stdout,
                        stderr: stderr,
                        duration: Date.now() - timeStampBeforeRunTheCode,
                        err: err == null ? null : err.message
                    }
                    if (!child.killed) this.checkCompiledCode(ret)
                })
                setTimeout(() => {
                    if (!childProcessDone) {
                        child.kill()
                        this.checkCompiledCode({
                            hasCompileError: false,
                            hasCodeError: true,
                            id: id,
                            username: username,
                            err: 'Your process killed because it was running too long!'
                        })
                    }
                }, 2000)
            })
        } else {
            this.checkCompiledCode({
                id: id,
                hasCompileError: true,
                message: 'No username received'
            })
        }
    }
    addInputToCode (input, code, lang) {
        return util.format(languages[lang].input + '\n\n', input) + code
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