const fs = require('fs');
const { exec } = require('child_process');

const STORE_DIRECTORY = './contest/user_codes';

// if store directory doesn't exist, let's make one!
if (!fs.existsSync(STORE_DIRECTORY)) fs.mkdirSync(STORE_DIRECTORY);

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
            output: '',
            duration: 0,
        };

        const before = Date.now();

        // if process worked more than a while, this timeout will kill it
        const killerTimeout = setTimeout(() => {
            process.kill();
            cb({
                hasErrors: true,
                error: 'Your process killed because it was running too long!'
            })
        }, 2500);

        const process = exec(command, (err, stdout, stderr) => {

            // stopping killerTimeout first
            clearTimeout(killerTimeout);

            // adding errors into result object
            if (stderr) {
                result.hasErrors = true;
                result.error = stderr;
            }

            // estimating time
            result.duration = Date.now() - before;

            // removing empty lines of output
            stdout = stdout.split('\r\n').filter(line => line !== '').join('\n').split('\n').filter(line => line !== '').join('\n');

            // putting stdout to result
            result.output = stdout;

            // returning result
            return cb(result)
        })
    }

}

module.exports = Compiler;