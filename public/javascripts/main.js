const Editor = require("./Editor")
const Leaderboard = require("./Leaderboard")
const UI = require("./UI")
const Socket = require("./Socket")

window.$ = query => document.querySelector(query)
window.$$ = query => document.querySelectorAll(query)

class App {
    constructor () {
        this.editor = new Editor("editor")
        this.leaderboard = new Leaderboard(".ranks")
        this.ui = new UI(this)
        this.socket = new Socket(this, '/')
    }
}

window.app = new App()