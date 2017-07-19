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
        const minMove = Math.abs(solver.exit.x - solver.characterFirstPosition.x) + Math.abs(solver.exit.y - solver.characterFirstPosition.y)
        const minScore = 100, maxScore = 300
        return Math.floor(Math.max(minScore ,maxScore - (((response.steps - minMove) / (maxMove - minMove)) * minScore)))
    }
    calcDurationScore (response, solver) {
        const maxDuration = 2000
        const maxScore = 300
        return Math.floor(Math.max(0, maxScore - ((maxScore * response.duration) / maxDuration)))
    }
    setScore (username, score) {
        this.socketServer.setScore(username, score)
    }
}

module.exports = ScoreChecker