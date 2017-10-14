const fs = require('fs');
const { exec } = require('child_process');

const STORE_DIRECTORY = './server/compilers/temp_files';

class Compiler {

    constructor () {
        this.ext = 'nothing'
    }

    store (username, code) {
        return new Promise((resolve, reject) => {
            const fileDir = `${STORE_DIRECTORY}/${username}.${this.ext}`;
            fs.writeFile(fileDir, code, (err) => {
                if (err) return reject(err);
                return resolve(fileDir);
            });
        });
    }

    execute (socket, command) {
        const ret = {
            hasErrors: false,
            hasMistakes: false,
            error: '',
            mistake: '',
            result: ''
        };
        return new Promise((resolve, reject, err) => {
            exec(command, function(err, stdout, stderr) {
                if (stderr) {
                    ret.hasErrors = true;
                    ret.error = stderr;
                    return resolve(ret);
                }
                ret.result = stdout;
                return resolve(ret)
            })
        })
    }

    on

}

module.exports = Compiler;