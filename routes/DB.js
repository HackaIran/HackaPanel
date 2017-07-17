const fs = require('fs')
const path = './challenge/db.json'

class DB {
    constructor () {
        this.json = JSON.parse(fs.readFileSync(path, 'utf8'))
        this.save()
    }
    save (cb = () => {}) {
        fs.writeFile(path, JSON.stringify(this.json), cb)
    }
}

module.exports = DB