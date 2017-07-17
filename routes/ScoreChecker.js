var Solver = require('./Solver')

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
                response.scores.steps = Math.floor(Math.random() * 400)
                response.scores.duration =  Math.floor(Math.random() * 300)
                response.scores.total = response.scores.steps + response.scores.duration
            } else {
                
            }
            // Garbaging solver
            this.solver = null
        }
        return response
    }
    setScore (username, score) {
        this.socketServer.setScore(username, score)
    }
}

module.exports = ScoreChecker