var Solver = require('../challenge/Solver')

class ScoreChecker {
    constructor (codeCompiler) {
        this.codeCompiler = codeCompiler
        this.socketServer = codeCompiler.socketServer
    }
    check (response) {
        response.solved = false
        if (!response.hasCompileError && !response.hasCodeError) {
            const solver = new Solver(response)
            response.solved = solver.solved
            response.scores = {steps: 0, duration: 0, total: 0}
            if (response.solved) {
                response.steps = response.stdout.split('\n').length - 1
                response.scores.steps = this.calcStepsScore(response, solver)
                response.scores.duration =  this.calcDurationScore(response, solver)
                response.scores.total = response.scores.steps + response.scores.duration
            } else {
                response.failingReason = solver.failingReason
            }
            // Garbaging solver
            this.solver = null
        }
        return response
    }
    calcStepsScore (response, solver) {
        const size = parseInt(response.input.split("\n")[0])
        const maxMove = size * size
        console.log(solver)
        const minMove = solver.exit
    }
    calcDurationScore (response, solver) {
        console.log(response.duration)
    }
    setScore (username, score) {
        this.socketServer.setScore(username, score)
    }
}

module.exports = ScoreChecker