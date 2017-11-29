const fs = require('fs');

describe('Config File Existence', function () {

    it('should find "config/hacka.config.js"', function () {
        expect(fs.existsSync('./config/hacka.config.js')).toBeTruthy();
    });

});

describe('Checking Necessary Properties', function () {

    const config = require('../config/hacka.config');

    it('should have config.city', function () {
        expect(config.city).toBeDefined();
        expect(typeof config.city).toBe('string');
    });

    it('should have config.time', function () {

        // check if time.start and time.end exist
        expect(config.time).toBeDefined();
        expect(config.time.start).toBeDefined();
        expect(config.time.end).toBeDefined();

        // Check time range
        expect(config.time.start.hours).toBeLessThan(24);
        expect(config.time.start.hours).toBeGreaterThanOrEqual(0);
        expect(config.time.start.minutes).toBeLessThan(60);
        expect(config.time.start.minutes).toBeGreaterThanOrEqual(0);
        expect(config.time.start.seconds).toBeLessThan(60);
        expect(config.time.start.seconds).toBeGreaterThanOrEqual(0);
    });

});