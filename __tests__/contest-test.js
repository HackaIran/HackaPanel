const fs = require('fs');

describe('Files Existence', function () {

    it('should find "contest/challenge.md"', function () {
        expect(fs.existsSync('./contest/challenge.md')).toBeTruthy();
    });

    it('should find "contest/inputs.js"', function () {
        expect(fs.existsSync('./contest/inputs.js')).toBeTruthy();
    });

    it('should find "contest/solver.js"', function () {
        expect(fs.existsSync('./contest/solver.js')).toBeTruthy();
    })
});