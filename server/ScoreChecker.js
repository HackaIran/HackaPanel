const solver = require('../contest/solver');
const inputs = require('../contest/inputs');
const server = require('./server');

const usersScore = {};

class ScoreChecker {
    constructor(compiler) {

        // parents
        this.compiler = compiler;
        this.server = compiler.server;

        // score checker properties
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
     * @param codeData
     * @return {Promise}
     */
    scoreThis (result, codeData, socket) {
        return new Promise (resolve => {

            // mixing solver result with current result object
            Object.assign(result, solver.solve(result));
            result.score = 0; // default score is 0

            // initializing total score
            if (result.inputId === 0) usersScore[codeData.username] = { totalScore: 0 };

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

                // calculating total score
                usersScore[codeData.username].totalScore += result.score

            }

            if (result.inputId === inputs.length - 1) {
                // a team got a new score!
                const username = codeData.username;
                const score = usersScore[username].totalScore;
                // call update team score function
                this.server.updateTeamScore(username, score, socket);
            }

            resolve(result);

        })
    }
}

module.exports = ScoreChecker;