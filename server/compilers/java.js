const Compiler = require('./Compiler');

class JavaCompiler extends Compiler {

    run (username, code, callback) {
        // first step is storing the code:
        this.store(`${username}.java`, code).then(file => {
            // exe path
            const dir = file.substring(0, file.lastIndexOf(username));

            // then we should exec file using this command:
            this.execute(`javac ${file}`, result => {

                if (result.hasErrors) return callback(result);

                this.execute(`cd ${dir} && java ${username}`, finalResult => {
                    // if code has errors returns result
                    if (finalResult.hasErrors) return callback(finalResult);

                    // if code has no errors tries to analyze it
                    return callback(finalResult)
                })
            })
        })
    }
}

const javaCompiler = new JavaCompiler();

module.exports = javaCompiler;