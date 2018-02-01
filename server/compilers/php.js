const Compiler = require('./Compiler');

class PhpCompiler extends Compiler {

    run (username, code, callback) {
        // first step is storing the code:
        this.store(`${username}.php`, code).then(file => {
            // then we should exec file using this command:
            this.execute(`php ${file}`, result => {
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

const phpCompiler = new PhpCompiler();

module.exports = phpCompiler;