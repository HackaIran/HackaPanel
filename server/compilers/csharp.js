const Compiler = require('./Compiler');

class CSharpCompiler extends Compiler {

    run (username, code, callback) {
        // first step is storing the code:
        this.store(`${username}.cs`, code).then(file => {
            // exe path
            const fileExe = file.substring(0, file.length - 3) + '.exe';
            // then we should exec file using this command:
            this.execute(`mcs ${file}`, () => this.execute(`mono ${fileExe}`, result => {
                // if code has errors returns result
                if (result.hasErrors) {
                    result.error = result.error.substring(result.error.indexOf("\n") + 1);
                    return callback(result);
                }

                // if code has no errors tries to analyze it
                return callback(result)
            }))
        })
    }
}

const csharpCompiler = new CSharpCompiler();

module.exports = csharpCompiler;