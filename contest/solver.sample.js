// Rename this file, remove .sample and enjoy the solver

class Solver {
    constructor () {

    }

    /**
     * gets result and solves it
     * @param result
     * @return Object { solved: Boolean, steps: Number, hasMistake: Boolean, mistake: String }
     */
    solve (result) {

        // solving process...

        return {
            solved: true,
            steps: 5,

            minSteps: 2,
            maxSteps: 10,

            minDuration: 200,
            maxDuration: 1000,

            hasMistakes: false,
            mistake: ''
        }
    }
}

const solver = new Solver();

module.exports = solver;