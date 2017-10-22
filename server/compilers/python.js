const Compiler = require('./Compiler');

class PythonCompiler extends Compiler {

    run (username, code, callback) {
        // first step is storing the code:
        this.store(`${username}.py`, code).then(file => {
            // then we should exec file using this command:
            this.execute(`python ${file}`, result => {
                // if code has errors returns result
                if (result.hasErrors) {
                    result.error = result.error.substring(result.error.indexOf("\n") + 1);
                    return callback(result);
                }

                // if code has no errors tries to analyze it
                return callback(result)
            })
        })
    }
}

const pythonCompiler = new PythonCompiler();

module.exports = pythonCompiler;