const javascriptCompiler = require('./compilers/javascript');
const pythonCompiler = require('./compilers/python');

class Compiler {

    onResult (socket, result) {
        // if code has errors
        if (result.hasErrors) return socket.emit('user code result', result)

    }

    run (socket, codeData) {
        const language = codeData.language;
        const username = codeData.username;
        const inputId = 0;
        const input = `1 2 3`;
        let code = codeData.code;

        // JAVASCRIPT
        if (language === 'javascript') {
            code = `const INPUT = '${input}';\n` + code;
            javascriptCompiler.run(username, code, (result) => {
                result.inputId = inputId;
                result.input = input;
                this.onResult(socket, result);
            });
        }

        // PYTHON
        else if (language === 'python') {
            code = `INPUT = '${input}'\n`;
            pythonCompiler.run(username, code, (result) => {
                result.inputId = inputId;
                result.input = input;
                this.onResult(socket, result);
            });
        }

        // if code's language was none of defined languages
        else {

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