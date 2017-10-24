const javascriptCompiler = require('./compilers/javascript');
const pythonCompiler = require('./compilers/python');
const csharpCompiler = require('./compilers/csharp');
const goCompiler = require('./compilers/go');
const javaCompiler = require('./compilers/java');

const untrustedPatterns = {
    javascript: /require\s*\(.*\)|import\s+.*/,
    python: /import\s+.*|from\s+.*import\s+.*/,
    csharp: /using\s+.*/,
    golang: /package\s+.*|import\s+.*/,
    java: /import\s+.*|/,
};

class Compiler {

    onResult (socket, result) {
        // if code has errors
        if (result.hasErrors) return socket.emit('user code result', result);

        return socket.emit('user code result', result)
    }

    static checkSecurity (language, code) {
        if (!untrustedPatterns.hasOwnProperty(language)) return [`${language} language doesn't exist`];
        return code.match(untrustedPatterns[language]);
    }

    run (socket, codeData) {
        const language = codeData.language;
        const username = codeData.username;
        const inputId = 0;
        const input = `1 2 3\n4 5 6\n7 8 9`;
        let code = codeData.code;

        const hasUntrustedMatches = Compiler.checkSecurity(language, code);

        if (hasUntrustedMatches) {
            const result = {
                hasErrors: true,
                error: `This line is not allowed:\n\n> ${hasUntrustedMatches[0]}\n\nCode is not trusted! Please contact mentors about this`
            };
            result.inputId = inputId;
            result.input = input;

            return this.onResult(socket, result)
        }

        // JAVASCRIPT
        if (language === 'javascript') {
            code = `
                const INPUT = \`${input}\`;
                ${code}
            `;
            javascriptCompiler.run(username, code, (result) => {
                result.inputId = inputId;
                result.input = input;
                this.onResult(socket, result);
            });
        }

        // PYTHON
        else if (language === 'python') {
            code = `INPUT = """${input}"""\n${code}`;
            pythonCompiler.run(username, code, (result) => {
                result.inputId = inputId;
                result.input = input;
                this.onResult(socket, result);
            });
        }

        // C#
        else if (language === 'csharp') {
            code = `
                using System;
                
                public class ${username}
                {
                    static public string INPUT = @"${input}";
                    ${code}
                }
            `;
            csharpCompiler.run(username, code, (result) => {
                result.inputId = inputId;
                result.input = input;
                this.onResult(socket, result);
            });
        }

        // Java
        else if (language === 'java') {
            code = `
                public class ${username} {
                    public static String INPUT = "${input.split('\n').join('\\n')}";
                    ${code}
                }
            `;
            javaCompiler.run(username, code, (result) => {
                result.inputId = inputId;
                result.input = input;
                this.onResult(socket, result);
            });
        }

        // Go
        else if (language === 'golang') {
            code = `package main\nimport "fmt"\nINPUT := \`${input}\`\n${code}`;
            goCompiler.run(username, code, (result) => {
                result.inputId = inputId;
                result.input = input;
                this.onResult(socket, result);
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

            this.onResult(socket, result)
        }
    }

    submit (socket, codeData) {
        // if request was just running the code:
        if (codeData.type === 'run') return this.run(socket, codeData);

        // if code was submitted

    }
}

const compiler = new Compiler();

module.exports = compiler;