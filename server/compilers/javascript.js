const Compiler = require('./Compiler');

class JavascriptCompiler extends Compiler {

    constructor () {
        super();
        this.ext = 'js';
    }

    run (socket, username, code) {
        this.store(username, code).then(file => {
            this.execute(socket, `node ${file}`)
        })
    }
}

const javascriptCompiler = new JavascriptCompiler();

module.exports = javascriptCompiler;