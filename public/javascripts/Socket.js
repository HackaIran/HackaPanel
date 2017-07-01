class Socket {
    constructor (app, address) {
        this.app = app
        this.socket = io.connect(address)
        this.socket.on('time-sync', this.onTimeSync.bind(this))
        this._connected = true
        this.testConnectionInterval = setTimeout(() => this.isConnected = false, 5000)
    }
    onTimeSync (seconds) {
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
        console.log("Connection Found!")
    }
    onConnectionLost () {
        console.log("Connection Lost!")
    }
}

module.exports = Socket