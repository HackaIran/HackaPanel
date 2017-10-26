class ScoreChecker {
    constructor() {

    }
    check (result) {
        return new Promise ((resolve, reject) => {
            if (/* if server was disconnected*/false) reject ('error');
            result.score = 300;
            result.hasMistakes = false;
            result.mistake = '';
            resolve(result);
        })
    }
}

const scoreChecker = new ScoreChecker();

module.exports = scoreChecker;