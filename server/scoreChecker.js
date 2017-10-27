const solver = require('../contest/solver');

class ScoreChecker {
    constructor() {
        this.minScore = 50;
        this.maxScore = 250
    }

    sandwichScore (current, min, max) {
        const maxS = this.maxScore;
        const minS = this.minScore;

        if (current < min) return maxS;
        if (current > max) return minS;

        const score = maxS - ((Math.abs(current - min) / Math.abs(max - min)) * Math.abs(maxS - minS));
        return Math.floor(score);
    }

    /**
     * Scores given result and returns score in a promise shell
     * @param result
     * @return {Promise}
     */
    scoreThis (result) {
        return new Promise (resolve => {

            // mixing solver result with current result object
            Object.assign(result, solver.solve(result));
            result.score = 0; // default score is 0

            if (result.solved) {

                // important parameters for scoring
                const steps = result.steps;
                const duration = result.duration;

                const minSteps = result.minSteps;
                const maxSteps = result.maxSteps;

                const minDuration = result.minDuration;
                const maxDuration = result.maxDuration;

                // calculating score details
                const stepsScore = this.sandwichScore(steps, minSteps, maxSteps);
                const durationScore = this.sandwichScore(duration, minDuration, maxDuration);

                // calculating final score
                result.score = stepsScore + durationScore;
            }

            resolve(result);

        })
    }
}

const scoreChecker = new ScoreChecker();

module.exports = scoreChecker;