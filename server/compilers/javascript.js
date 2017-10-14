const Compiler = require('./Compiler');

class JavascriptCompiler extends Compiler {

    run (username, code, cb) {
        // first step is storing the code:
        this.store(`${username}.js`, code).then(file => {
            // then we should exec file using this command:
            this.execute(`node ${file}`, result => {
                // if code has errors returns result
                if (result.hasErrors) {
                    result.error = result.error.substring(result.error.indexOf("\n") + 1);
                    return cb(result);
                }

                // if code has no errors tries to analyze it

            })
        })
    }
}

const javascriptCompiler = new JavascriptCompiler();

module.exports = javascriptCompiler;