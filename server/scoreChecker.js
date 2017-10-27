class ScoreChecker {
    constructor() {

    }
    check (result) {
        return new Promise ((resolve, reject) => {
            result.score = 300;
            result.hasMistakes = false;
            result.mistake = '';
            resolve(result);
        })
    }
}

const scoreChecker = new ScoreChecker();

module.exports = scoreChecker;