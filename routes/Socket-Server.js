const moment = require("moment");
const config = require("../panel.config")
const CodeCompiler = require('./CodeCompiler')
const db = require('./db-handler')

const start = moment().set(config.time.start)
const end = moment().set(config.time.end)

const getRemainingTime = () => {
    const timeSpent = moment().diff(start, 'seconds')
    if (timeSpent < 0) return 'Starting in ' + -timeSpent + 's'
    return -moment().diff(end, 'seconds')
}

class SocketServer {
    constructor (io, teamAuth) {
        this.io = io
        this.db = db
        this.resetAllConnections()
        this.compiler = new CodeCompiler(this)
        this.teamAuth = teamAuth
        this.allowSubmits = false
        this.nitroMode = false
        this.io.on("connection", this.onUserConnected.bind(this))
        setInterval(() => { this.tick() }, 1000)
    }
    resetAllConnections () {
        for (let username in this.db.json.teams) this.db.json.teams[username].connect = false
        db.save()
    }
    onUserConnected (socket) {
        this.io.to(socket.id).emit("initial-settings", {
            id: socket.id,
            time: getRemainingTime(),
            teams: db.json.teams
        })
        socket.on('disconnect', () => this.teamAuth.disconnect(socket.id))
        socket.on("user-connect", this.onUserRequestedToConnect.bind(this))
        socket.on("user-run", data => this.onUserRequestRunTheCode(socket.id, data))
        socket.on("user-submit", data => this.onUserRequestedToSubmitTheCode(socket.id, data))
    }
    onUserRequestedToConnect (data) {
        db.json.teams[data.username].connect = true
        db.json.teams[data.username].id = data.id
        db.save()
    }
    onUserRequestRunTheCode (id, data) {
        if (this.allowSubmits) {
            data.id = id
            data.username = this.teamAuth.findTeamIndexById(id)
            this.compiler.run(0, data, response => {
                this.sendConsoleResponse(response)
            })
        }
    }
    onUserRequestedToSubmitTheCode (id, data) {
        if (this.allowSubmits) {
            data.id = id
            data.username = this.teamAuth.findTeamIndexById(id)
            this.compiler.volly(data, result => {
                this.io.to(result.id).emit('code-submit-finished', true)
                db.json.teams[result.username].submits++
                db.save()
                this.setScore(result.username, result.score)
            })
        }
    }
    tick () {
        const timeRemaining = getRemainingTime()
        this.allowSubmits = true
        if (typeof timeRemaining == 'string') this.allowSubmits = false
        else if (timeRemaining < 0) this.allowSubmits = false
        if (timeRemaining < 60 * 10) {
            this.nitroMode = true
        }
        this.io.emit("time-sync", timeRemaining)
    }
    setScore (username, score) {
        if (db.json.teams[username].score < score) {
            db.json.teams[username].score = score
            db.save()
            if (!this.nitroMode) {
                this.io.emit("score-changed", {
                    username: username,
                    score: score
                })
            } else {
                this.io.to(db.json.teams[username].id).emit("score-changed", {
                    username: username,
                    score: score
                })
            }
        }
    }
    hiddenize (response) {
        if (response.inputId > 3) {
            response.input = '(hidden)'
            response.stdout = '(hidden)'
            response.stderr = ''
            if (response.err != null) response.err = 'You have some structural erros, check level 1, 2 or 3 to find out what is that!'
        }
        return response
    }
    sendConsoleResponse (response) {
        try {
            response = this.hiddenize(response)
            this.io.to(response.id).emit("console-response", response)
        } catch (e) {}
    }
}

module.exports = SocketServer