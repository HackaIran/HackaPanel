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
    run (i, data, callback) {
        if (config.teams.hasOwnProperty(data.username)) {
            const filepath = './codes/' + data.username + '.' + languages[data.lang].ext
            const exepath = './codes/' + data.username + '.exe'
            data.code = this.addInputToCode(inputs[i], data.code, data.lang)
            fs.writeFile(filepath, data.code, 'utf8', (err) => {
                if (err) throw err;
                console.log(data.username + ' submited a new file!');
                var childProcessDone = false
                const timeStampBeforeRunTheCode = Date.now()
                const shellCommand = util.format(languages[data.lang].runPattern, filepath)
                const child = exec(shellCommand, (err, stdout, stderr) => {
                    childProcessDone = true
                    const ret = {
                        inputId: i,
                        input: inputs[i],
                        hasCompileError: false,
                        hasCodeError: err ? true : false,
                        id: data.id,
                        username: data.username,
                        stdout: stdout,
                        stderr: stderr,
                        duration: Date.now() - timeStampBeforeRunTheCode,
                        err: err == null ? null : err.message
                    }
                    if (!child.killed) {
                        callback(this.checkCompiledCode(ret))
                    }
                })
                setTimeout(() => {
                    if (!childProcessDone) {
                        child.kill()
                        callback(this.checkCompiledCode({
                            inputId: i,
                            input: inputs[i],
                            hasCompileError: false,
                            hasCodeError: true,
                            id: data.id,
                            username: data.username,
                            err: 'Your process killed because it was running too long!'
                        }))
                    }
                }, 2000)
            })
        } else {
            callback(this.checkCompiledCode({
                inputId: i,
                input: inputs[i],
                id: data.id,
                hasCompileError: true,
                message: 'No username received'
            }))
        }
    }
    addInputToCode (input, code, lang) {
        return util.format(languages[lang].input + '\n\n', input) + code
    }
    checkCompiledCode (response) {
        if (!response.hasCompileError) {
            return this.scoreChecker.check(response)
        }
        else {
            if (response.username === undefined) {
                console.warn('Could not submit a Code', response)
            }
        }
    }
    
}

module.exports = CodeCompiler