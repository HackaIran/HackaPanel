const moment = require("moment");
const config = require("../panel.config")

const start = moment().set(config.time.start)
const end = moment().set(config.time.end)
const getRemainingTime = () => -moment().diff(end, 'seconds')

class SocketServer {
    constructor (io, teamAuth) {
        this.io = io
        this.teamAuth = teamAuth
        this.io.on("connection", this.onUserConnected.bind(this))
        setInterval(() => { this.tick() }, 1000)
    }
    onUserConnected (socket) {
        this.io.to(socket.id).emit("initial-settings", {
            id: socket.id,
            time: getRemainingTime(),
            teams: config.teams
        })
        socket.on('disconnect', () => {
            this.teamAuth.disconnect(socket.id)
        })
        socket.on("user-connect", this.onUserRequestedToConnect.bind(this))
    }
    onUserRequestedToConnect (data) {
        this.teamAuth.teams[data.username].connect = true
        this.teamAuth.teams[data.username].id = data.id
    }
    tick () {
        this.io.emit("time-sync", getRemainingTime())
    }
}

module.exports = SocketServer