const Compiler = require('./Compiler');

class GoCompiler extends Compiler {

    run (username, code, callback) {

        // first step is storing the code:
        this.store(`${username}.go`, code).then(file => {
            // exe path
            const dir = file.substring(0, file.lastIndexOf(username));

            this.execute(`cd ${dir} && go build ${username}.go`, result => {

                if (result.hasErrors) return callback(result);

                this.execute(`cd ${dir} && ${username}.exe`, finalResult => {
                    // if code has errors returns result
                    if (finalResult.hasErrors) return callback(finalResult);

                    // if code has no errors tries to analyze it
                    return callback(finalResult)
                })
            })
        })
    }
}

const goCompiler = new GoCompiler();

module.exports = goCompiler;