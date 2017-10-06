const fs = require('fs');
const beautify = require('json-beautify');

class DB {
    constructor (path) {
        this.path = path;
        const content = fs.readFileSync(this.path, 'utf8');
        this.json = JSON.parse(content === '' ? '{}' : content)
    }
    save (cb = () => {}) {
        fs.writeFile(this.path, beautify(this.json, null, 4, 50), cb)
    }
}

const db = new DB('./challenge/db.json');

module.exports = db;