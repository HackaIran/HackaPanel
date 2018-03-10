const javascriptCompiler = require('../server/compilers/javascript')
const pythonCompiler = require('../server/compilers/python')

const { exec } = require('child_process')

describe('Compilers Installation', function () {

    it('node should be installed', function (done) {
        exec('node -v', (err, stdout, stderr) => {
            expect(err).toBeFalsy();
            expect(stderr).toBeFalsy();
            done();
        });
    })

    it('python should be installed', function (done) {
        exec('python --version', (err, stdout, stderr) => {
            expect(err).toBeFalsy();
            expect(stderr.toLowerCase()).toContain('python');
            done();
        });
    });

})

describe('Compilers works fine', function () {

    const username = 'hacka_test';
    
    it('should compile javascript correctly', function (done) {
        const code = `console.log("Hacka!");`;
        javascriptCompiler.run(username, code, (result) => {
            expect(result.output).toBe('Hacka!')
            done()
        });
    });

    it('should compile python correctly', function (done) {
        const code = `print("Hacka!")`;
        pythonCompiler.run(username, code, (result) => {
            expect(result.output).toBe('Hacka!')
            done()
        });
    });

})