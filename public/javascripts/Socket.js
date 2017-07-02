class Socket {
    constructor (app, address) {
        this.app = app
        this.socket = io.connect(address)
        this.socket.on('initial-settings', this.onInitialSettings.bind(this))
        this.socket.on('time-sync', this.onTimeSync.bind(this))
        this.socket.on('score-changed', this.onScoreChanged.bind(this))
        this._connected = true
        this.testConnectionInterval = setTimeout(() => this.isConnected = false, 5000)
    }
    onInitialSettings (data) {
        this.app.connection.id = data.id
        this.onTimeSync(data.time)
        this.app.leaderboard.initializeTeams(data.teams)
        this.socket.emit('user-connect', {
            username: this.app.username,
            id: this.app.connection.id
        })
    }
    onTimeSync (seconds) {
        if (seconds < (10 * 60) && this.app.mode === 'coding') this.app.enterNitroMode()
        if (seconds <= 0 && (this.app.mode === 'nitro' || this.app.mode === 'coding')) this.app.enterTimesUpMode()
        this.app.ui.setTimer(seconds)
        this.checkConnectionOnTimerSynced()
    }
    checkConnectionOnTimerSynced () {
        this.isConnected = true
        clearTimeout(this.testConnectionInterval)
        this.testConnectionInterval = setTimeout(() => this.isConnected = false, 5000)
    }
    get isConnected () {
        return this._connected
    }
    set isConnected (shouldConnect) {
        if (!this._connected && shouldConnect) this.onConnectionFound()
        else if (this._connected && !shouldConnect) this.onConnectionLost()
        this._connected = shouldConnect
    }
    onConnectionFound () {
        $('footer .connection').classList.remove('fail')
    }
    onConnectionLost () {
        $('footer .connection').classList.add('fail')
    }
    onScoreChanged (data) {
        this.app.leaderboard.getTeamByUsername(data.username).score = data.score
    }
}

module.exports = Socket