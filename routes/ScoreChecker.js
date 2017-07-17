var Solver = require('./Solver')

class ScoreChecker {
    constructor (codeCompiler) {
        this.codeCompiler = codeCompiler
        this.socketServer = codeCompiler.socketServer
    }
    check (response) {
        const solver = new Solver(response)
        response.solved = (!response.hasCompileError && !response.hasCodeError) && true
        response.steps = response.stdout.split('\n').length - 1
        const stepsScore = Math.floor(Math.random() * 400)
        const durationScore =  Math.floor(Math.random() * 300)
        response.scores = {
            steps: response.solved ? stepsScore : 0,
            duration: response.solved ? durationScore : 0,
            total: 0
        }
        if (response.solved) response.scores.total = response.scores.steps + response.scores.duration
        this.solver = null // Garbaging solver
        return response
    }
    setScore (username, score) {
        this.socketServer.setScore(username, score)
    }
}

module.exports = ScoreChecker