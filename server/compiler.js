const javascriptCompiler = require('./compilers/javascript');
const pythonCompiler = require('./compilers/python');

class Compiler {
    run (socket, codeData) {
        socket.emit('code running');

        const language = codeData.language;
        const code = codeData.code;

        if (language === 'javascript') {
            javascriptCompiler.run(code);
        }
        else if (language === 'python') {
            pythonCompiler.run(code);
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