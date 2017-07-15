class ScoreChecker {
    constructor (codeCompiler) {
        this.codeCompiler = codeCompiler
        this.socketServer = codeCompiler.socketServer
    }
    check (response) {
        console.log(response)
        this.socketServer.sendConsoleResponse(response)
        this.setScore(response.username, Math.floor(Math.random() * 300))
    }
    setScore (username, score) {
        this.socketServer.setScore(username, score)
    }
}

module.exports = ScoreChecker