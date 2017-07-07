class ScoreChecker {
    constructor () {

    }
    check (stdout) {
        return Math.floor(Math.random() * 300)
    }
}

module.exports = ScoreChecker