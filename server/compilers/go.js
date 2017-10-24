const Compiler = require('./Compiler');

class GoCompiler extends Compiler {

    run (username, code, callback) {

        // first step is storing the code:
        this.store(`${username}.go`, code).then(file => {

            // then we should exec file using this command:
            this.execute(`go run ${file}`, result => {

                // if code has errors returns result
                if (result.hasErrors) return callback(result);

                return callback(result)
            })
        })
    }
}

const goCompiler = new GoCompiler();

module.exports = goCompiler;