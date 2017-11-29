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

    it('should have get() method', function () {
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

describe('Standard Check for "solver.js"', function () {

    const inputs = require('../contest/inputs');
    const solver = require('../contest/solver');

    it('should have solve() method', function () {
        expect(solver.solve).toBeDefined();
    });

    it('should return { solved, rate, minDuration, maxDuration, hasMistakes, mistake }', function () {

        const result = solver.solve({ input: inputs.get(0), inputId: 0, output: 'Hacka' });

        expect(result).toHaveProperty('solved');
        expect(typeof result.solved).toBe('boolean');

        expect(result).toHaveProperty('rate');
        expect(typeof result.rate).toBe('number');

        expect(result).toHaveProperty('minDuration');
        expect(typeof result.minDuration).toBe('number');

        expect(result).toHaveProperty('maxDuration');
        expect(typeof result.maxDuration).toBe('number');

        expect(result).toHaveProperty('hasMistakes');
        expect(typeof result.hasMistakes).toBe('boolean');

        expect(result).toHaveProperty('mistake');
        expect(typeof result.mistake).toBe('string');

    })

});