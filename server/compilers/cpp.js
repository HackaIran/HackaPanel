const Compiler = require('./Compiler');

class CppCompiler extends Compiler {

    run (username, code, callback) {

        // first step is storing the code:
        this.store(`${username}.cc`, code).then(file => {
            // exe path
            const dir = file.substring(0, file.lastIndexOf(username));

            this.execute(`cd ${dir} && g++ -o ${username} ${username}.cc`, result => {

                if (result.error) return callback(result);

                this.execute(`cd ${dir} && ./${username}`, finalResult => {
                    // if code has errors returns result
                    if (finalResult.hasErrors) return callback(finalResult);

                    // if code has no errors tries to analyze it
                    return callback(finalResult)
                })
            })
        })
    }
}

const cppCompiler = new CppCompiler();

module.exports = cppCompiler;