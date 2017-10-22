const Compiler = require('./Compiler');

class CSharpCompiler extends Compiler {

    run (username, code, callback) {
        // first step is storing the code:
        this.store(`${username}.cs`, code).then(file => {
            // exe path
            const fileExe = file.substring(0, file.length - 3) + '.exe';
            // then we should exec file using this command:
            this.execute(`mcs ${file}`, result => {

                if (result.hasErrors) return callback(result);

                this.execute(`mono ${fileExe}`, finalResult => {
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