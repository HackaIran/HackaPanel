const Editor = require("./Editor")
const Output = require("./Output")
const Leaderboard = require("./Leaderboard")
const UI = require("./UI")
const Socket = require("./Socket")
const Mousetrap = require('mousetrap')

class App {
    constructor (auth, username) {
        this.auth = auth
        this.username = username
        this.mode = 'coding'
        this.canSubmit = false
        this.connection = {}
        this.ui = new UI(this)
        this.editor = new Editor(this, "editor")
        this.output = new Output(this)
        this.leaderboard = new Leaderboard(this, ".ranks")
        this.socket = new Socket(this, '/')
        this.initShortcuts()
    }
    initShortcuts () {
        Mousetrap.bind("alt alt alt alt alt alt", () => { this.auth.logout() })
    }
    enterNitroMode () {
        this.mode = 'nitro'
        this.leaderboard.disable()
    }
    enterTimesUpMode () {
        this.mode = 'timesup'
    }
}

module.exports = App