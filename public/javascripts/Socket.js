class Socket {
    constructor (app, address) {
        this.app = app
        this.editor = app.editor
        this.output = app.output
        this.socket = io.connect(address)
        this.socket.on('initial-settings', this.onInitialSettings.bind(this))
        this.socket.on('time-sync', this.onTimeSync.bind(this))
        this.socket.on('score-changed', this.onScoreChanged.bind(this))
        this.socket.on('console-response', this.onConsoleResponse.bind(this))
        this.socket.on('code-submit-finished', this.onCodeSubmitFinished.bind(this))
        this._connected = true
        this.testConnectionInterval = setTimeout(() => this.isConnected = false, 5000)
    }
    onInitialSettings (data) {
        this.app.connection.id = data.id
        this.onTimeSync(data.time)
        if (data.time > 60 * 10) {
            this.app.leaderboard.initializeTeams(data.teams)
        }
        else {
            this.app.leaderboard.initializeTeams(data.teams, true)
            this.app.enterNitroMode()
        }
        this.socket.emit('user-connect', {
            username: this.app.username,
            id: this.app.connection.id
        });
    }
    onConsoleResponse (data) {
        if (!this.isInHardLoading) this.output.disableLoading()
        this.output.put(data)
        this.output.select(data.inputId)
    }
    onCodeSubmitFinished () {
        this.isInHardLoading = false
        this.output.disableLoading()
    }
    onTimeSync (seconds) {
        if (typeof seconds == 'string') {
            this.app.canSubmit = false
            this.app.ui.writeInTimer(seconds)
        } else {
            if (seconds < (10 * 60)) this.app.enterNitroMode()
            if (seconds <= 0) this.app.enterTimesUpMode()
            if (seconds <= 0 && seconds >= -14) this.app.countDown(seconds)
            if (seconds < -15) this.app.showWinner()
            this.app.ui.setTimer(seconds)
        }
        this.checkConnectionOnTimerSynced()
    }
    checkConnectionOnTimerSynced () {
        this.isConnected = true
        clearTimeout(this.testConnectionInterval)
        this.testConnectionInterval = setTimeout(() => this.isConnected = false, 5000)
    }
    runTheCode () {
        if (this.isConnected && this.app.canSubmit) {
            this.socket.emit('user-run', {
                code: this.app.editor.value,
                lang: this.editor.language
            })
            this.output.enableLoading()
        } else {
            console.error(`You cannot run your code when you are offline`)
        }
    }
    submitTheCode () {
        if (this.isConnected && this.app.canSubmit) {
            this.socket.emit('user-submit', {
                code: this.app.editor.value,
                lang: this.editor.language
            })
            this.isInHardLoading = true
            this.output.enableLoading()
        } else {
            console.error(`You cannot submit your code when you are offline`)
        }
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
        this.app.ui.turnOffDisableMode()
        $('footer .connection').classList.remove('fail')
    }
    onConnectionLost () {
        this.app.ui.turnOnDisableMode()
        $('footer .connection').classList.add('fail')
    }
    onScoreChanged (data) {
        this.app.leaderboard.getTeamByUsername(data.username).score = data.score
    }
}

module.exports = Socket