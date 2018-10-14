const Compiler = require('./Compiler');

class CSharpCompiler extends Compiler {

    run (username, code, callback) {
        // first step is storing the code:
        this.store(`${username}.cs`, code).then(file => {

            const dir = file.substring(0, file.lastIndexOf(username));

            // then we should exec file using this command:
            this.execute(`cd ${dir} && csc ${username}.cs`, result => {

                if (result.hasErrors) return callback(result);

                this.execute(`cd ${dir} && mono ${username}.exe`, finalResult => {
                    // if code has errors returns result
                    if (finalResult.hasErrors) return callback(finalResult);

                    // if code has no errors tries to analyze it
                    return callback(finalResult)
                })
            })
        })
    }
}

const csharpCompiler = new CSharpCompiler();

module.exports = csharpCompiler;