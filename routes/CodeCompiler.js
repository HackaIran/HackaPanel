const { spawn, exec } = require('child_process')
const fs = require('fs')
const util = require('util')
const db = require("./db-handler")
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
        runPattern: 'python %s'
    }
}

class CodeCompiler {
    constructor (socketServer) {
        this.socketServer = socketServer
        this.scoreChecker = new ScoreChecker(this)
    }
    volly (data, callback, index = 0, result = {score: 0, duration: 0, steps: 0}) {
        const vollyFinished = index === inputs.length
        if (vollyFinished) {
            console.log(data.username + ' has new submited code, the score is ' + result.score);
            result.id = data.id
            result.username = data.username
            callback(result)
        }
        else {
            this.run(index, data, (response) => {
                this.socketServer.sendConsoleResponse(response)
                // Some corrections
                response.scores = response.scores || {}
                response.scores.total = response.scores.total || 0
                response.duration = response.duration || 0
                response.steps = response.steps || 0
                // Returnal functions
                this.volly(data, callback, index + 1, {
                    score: result.score + response.scores.total,
                    duration: result.duration + response.duration,
                    steps: result.steps + response.steps,
                })
            })
        }
    }
    run (i, data, callback) {
        if (db.json.teams.hasOwnProperty(data.username)) {
            const filepath = './codes/' + data.username + '.' + languages[data.lang].ext
            const exepath = './codes/' + data.username + '.exe'
            const code = this.addInputToCode(inputs[i], data.code, data.lang)
            fs.writeFile(filepath, code, 'utf8', (err) => {
                if (err) throw err;
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