const Compiler = require('./Compiler');

class PythonCompiler extends Compiler {

    run (socket, username, code) {

        const filename = `${username}.py`;

        this.store(filename, code).then(file => {
            this.execute(socket, `python ${file}`)
        })

    }

}

const pythonCompiler = new PythonCompiler();

module.exports = pythonCompiler;