const Sphere = require('sphere-engine');

const javascriptCompiler = require('./compilers/javascript');
const pythonCompiler = require('./compilers/python');
const csharpCompiler = require('./compilers/csharp');
const goCompiler = require('./compilers/go');
const javaCompiler = require('./compilers/java');
const cppCompiler = require('./compilers/cpp');
const phpCompiler = require('./compilers/php');

const ScoreChecker = require('./ScoreChecker');

let sphere;

try {
    const apiConfig = require('../config/apis.config')
    sphere = new Sphere(apiConfig.sphere);
} catch (e) {
    console.log(`Couldn't connect to sphere`);
}

let inputs;

try {
    inputs = require('../contest/inputs')
} catch (e) {
    inputs = require('../contest/inputs.sample')
}

const untrustedPatterns = {
    javascript: /require\s*\(.*\)|import\s+.*/,
    python: /import\s+.*|from\s+.*import\s+.*/,
    csharp: /using\s+.*/,
    golang: /package\s+.*|import\s+.*/,
    java: /import\s+.*/,
    'c_cpp': /#include\s+.*/,
    php: /require\s+.*/
};

const runningQueue = [];
let isRunningCode = false;

class Compiler {

    constructor (server) {
        this.server = server;
        this.scoreChecker = new ScoreChecker(this);
        this.isOnline = false;
        if (sphere) sphere.ready(() => this.isOnline = true);
    }

    onResult (socket, codeData, result) {

        // if code has errors
        if (result.hasErrors) {
            if (result.inputId > 3) {
                result.input = '(hidden)';
                result.output = '(hidden)';
                result.error = `Code has some errors and cannot run`;
            }
            return socket.emit('user code result', result);
        }

        // checking scores and mistakes
        this.scoreChecker.scoreThis(result, codeData, socket)
            .then(result => {
                if (result.inputId > 3) {
                    result.input = '(hidden)';
                    result.output = '(hidden)';
                }
                socket.emit('user code result', result)
            })
            .catch(error => console.error(error));
    }

    static checkSecurity (language, code) {
        if (!untrustedPatterns.hasOwnProperty(language)) return [`${language} language doesn't exist`];
        return code.match(untrustedPatterns[language]);
    }

    offlineRun (socket, codeData, inputId) {
        return new Promise((resolve) => {
            const language = codeData.language;
            const username = codeData.username;
            const input = inputs.get(inputId);
            let code = codeData.code;

            // security check for codes
            const hasUntrustedMatches = Compiler.checkSecurity(language, code);

            if (hasUntrustedMatches) {
                const result = {
                    hasErrors: true,
                    error: `This line is not allowed:\n\n> ${hasUntrustedMatches[0]}\n\nCode is not trusted! Please tell mentors about this`
                };
                result.inputId = inputId;
                result.input = input;

                return resolve(this.onResult(socket, codeData, result))
            }

            // JAVASCRIPT
            if (language === 'javascript') {
                code = `const INPUT = \`${input}\`;\n${code}`;
                javascriptCompiler.run(username, code, (result) => {
                    result.inputId = inputId;
                    result.input = input;
                    resolve(this.onResult(socket, codeData, result));
                });
            }

            // PHP
            if (language === 'php') {
                code = `<?php\n$INPUT = "${input.split('\n').join('\\n')}";\n${code}\n?>`;
                phpCompiler.run(username, code, (result) => {
                    result.inputId = inputId;
                    result.input = input;
                    resolve(this.onResult(socket, codeData, result));
                });
            }

            // PYTHON
            else if (language === 'python') {
                code = `INPUT = """${input}"""\n${code}`;
                pythonCompiler.run(username, code, (result) => {
                    result.inputId = inputId;
                    result.input = input;
                    resolve(this.onResult(socket, codeData, result));
                });
            }

            // C#
            else if (language === 'csharp') {
                code = `using System;\nusing System.Collections.Generic;\nusing System.Linq;\npublic class ${username} {\nstatic public string INPUT = @"${input}";\n${code}\n}`;
                csharpCompiler.run(username, code, (result) => {
                    result.inputId = inputId;
                    result.input = input;
                    resolve(this.onResult(socket, codeData, result))
                });
            }

            // Java
            else if (language === 'java') {
                code = `public class ${username} {\npublic static String INPUT = "${input.split('\n').join('\\n')}";\n${code}\n}`;
                javaCompiler.run(username, code, (result) => {
                    result.inputId = inputId;
                    result.input = input;
                    resolve(this.onResult(socket, codeData, result))
                });
            }

            // Go
            else if (language === 'golang') {
                code = `package main\nimport (\n\t"fmt"\n\t"strings"\n)\nconst INPUT string = "${input.split('\n').join('\\n')}"\n${code}`;
                goCompiler.run(username, code, (result) => {
                    result.inputId = inputId;
                    result.input = input;
                    resolve(this.onResult(socket, codeData, result))
                });
            }

            // C/C++
            else if (language === 'c_cpp') {
                code = `#include <iostream.h>\n#include <stdio.h>\n#include <math.h>\n#include <string.h>\nchar INPUT[100] = "${input.split('\n').join('\\n')}";\n\n${code}`;
                cppCompiler.run(username, code, (result) => {
                    result.inputId = inputId;
                    result.input = input;
                    resolve(this.onResult(socket, codeData, result))
                });
            }

            // if code's language was none of defined languages
            else {
                const result = {
                    hasErrors: true,
                    error: `${language} language is not supported`
                };
                result.inputId = inputId;
                result.input = input;

                resolve(this.onResult(socket, codeData, result));
            }
        });
    }

    onlineRun (socket, codeData, inputId) {
        let language = codeData.language;
        let code = codeData.code;
        if (language === 'javascript') language = 'nodejs';

        return new Promise((resolve, reject) => {    
            sphere.compile({
                language: language,
                source: code
            }, 100).then(result => {
                result.inputId = inputId;
                result.duration = parseFloat(result.time) * 1000;
                result.hasErrors = Boolean(result.error);
                if (result.output) result.output = result.output.trim();
                resolve(this.onResult(socket, codeData, result));
            });
        })
    }

    run (socket, codeData, inputId) {
        if (this.isOnline) {
            return this.onlineRun(socket, codeData, inputId);
        } else {
            return this.offlineRun(socket, codeData, inputId);
        }
    }

    runNextItemInQueue () {
        // resting time between each running
        const restTime = 100;

        // queue runner
        if (!isRunningCode && runningQueue.length > 0) {
            isRunningCode = true;
            const runnable = runningQueue.shift();
            if (runnable) {
                this.run(runnable.socket, runnable.codeData, runnable.inputId).then(() => setTimeout(() => {
                    isRunningCode = false;
                    this.runNextItemInQueue();
                }, restTime))
            }
        }

    }

    addToQueue (socket, codeData, inputId) {
        runningQueue.push({ socket, codeData, inputId });
        this.runNextItemInQueue();
    }

    submit (socket, codeData) {
        // if request was just running the code:
        if (codeData.type === 'run') return this.addToQueue(socket, codeData, 0);

        // if code was submitted
        if (codeData.type === 'submit') for (let inputId = 0; inputId < inputs.length; inputId++) {
            this.addToQueue(socket, codeData, inputId);
        }
    }
}

module.exports = Compiler;