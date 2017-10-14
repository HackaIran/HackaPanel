const fs = require('fs');
const { exec } = require('child_process');

const STORE_DIRECTORY = './server/compilers/temp_files';

class Compiler {

    store (filename, code) {
        return new Promise((resolve, reject) => {
            const fileDir = `${STORE_DIRECTORY}/${filename}`;
            fs.writeFile(fileDir, code, (err) => {
                if (err) return reject(err);
                return resolve(fileDir);
            });
        });
    }

    execute (command, cb) {
        const result = {
            hasErrors: false,
            hasMistakes: false,
            error: '',
            mistake: '',
            output: ''
        };
        exec(command, (err, stdout, stderr) => {
            if (stderr) {
                result.hasErrors = true;
                result.error = stderr;
            }
            result.output = stdout;
            return cb(result)
        })
    }

}

module.exports = Compiler;