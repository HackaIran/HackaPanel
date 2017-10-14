const Compiler = require('./Compiler');

class PythonCompiler extends Compiler {

    constructor () {
        super();
        this.ext = 'py';
    }

    run () {

    }
}

const pythonCompiler = new PythonCompiler();

module.exports = pythonCompiler;