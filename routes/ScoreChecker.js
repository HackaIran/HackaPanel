class ScoreChecker {
    constructor (codeCompiler) {
        this.codeCompiler = codeCompiler
        this.socketServer = codeCompiler.socketServer
    }
    check (response) {
        response.solved = true
        response.steps = response.stdout.split('\n').length - 1
        response.scores = {
            steps: 400,
            duration: 300,
            total: 0
        }
        if (response.solved) response.scores.total = response.scores.steps + response.scores.duration
        this.socketServer.sendConsoleResponse(response)
    }
    setScore (username, score) {
        this.socketServer.setScore(username, score)
    }
}

module.exports = ScoreChecker