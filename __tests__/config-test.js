const fs = require('fs');

describe('Config File Existence', function () {

    it('should find "config/hacka.config.js"', function () {
        expect(fs.existsSync('./config/hacka.config.js')).toBeTruthy();
    });

});