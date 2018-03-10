const javascriptCompiler = require('../server/compilers/javascript')
const { exec } = require('child_process')

describe('Compilers Installation', function () {

    it('node should be installed', function (done) {
        exec('node -v', (err, stdout, stderr) => {
            expect(err).toBeFalsy();
            expect(stderr).toBeFalsy();
            done();
        });
    })

})

describe('Compilers works fine', function () {

    const username = 'hacka_test';
    
    it('should compile javascript correctly', function (done) {
        const javascriptCode = `const INPUT = 'Hacka!';\nconsole.log(INPUT);`;
        javascriptCompiler.run(username, javascriptCode, (result) => {
            expect(result.output).toBe('Hacka!')
            done()
        });
    });

})