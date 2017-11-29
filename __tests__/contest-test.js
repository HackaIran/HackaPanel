const fs = require('fs');

describe('Contest Files Existence', function () {

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

describe('Standard Check for "inputs.js"', function () {

    const inputs = require('../contest/inputs');

    it('should have get method', function () {
        expect(inputs.get).toBeDefined();
        expect(typeof inputs.get).toBe('function')
    });

    it('should have length property', function () {
        expect(inputs.length).toBeDefined();
        expect(typeof inputs.length).toBe('number')
    });

    it('should return input when get() calls', function () {
        for (let i = 0; i < inputs.length; i++) expect(inputs.get(i)).toBeDefined();
    })

});